using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIs.Models;

namespace WebAPIs.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly TaskManagementContext _context;

        public UserController(TaskManagementContext context)
        {
            _context = context;
        }

        [HttpGet("/get_user/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost("/create_user/")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("/update_user/{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id) return BadRequest();

            _context.Entry(user).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("/delete_user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
