using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;
using WebAPIs.Models;

namespace WebAPIs.Controllers
{
    [ApiController]
    [Route("users")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly TaskManagementContext _context;

        public UserController(TaskManagementContext context)
        {
            _context = context;
        }

        [HttpGet("get_user")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost("create_user")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var existUser = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == user.Email.ToLower());

            if (existUser != null)
            {
                return BadRequest(new { message = "A user with this email exists" });
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("update_user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id) return BadRequest();

            _context.Entry(user).State = EntityState.Modified;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("delete_user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("home")]
        public async Task<ActionResult<object>> GetCurUser()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            return Ok(new
            {
                id = user.Id,
                email = user.Email,
                first_name = user.FirstName,
                last_name = user.LastName
            });


        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllUsers()
        {
            var users = await _context.Users.Select(u => new
            {
                id = u.Id,
                email = u.Email,
                first_name = u.FirstName,
                last_name = u.LastName
            }).ToListAsync();

            return Ok(users);
        }
    }
}

// create login, home, and all in this