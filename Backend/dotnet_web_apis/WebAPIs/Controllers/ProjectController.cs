using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIs.Models;

namespace WebAPIs.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectController : ControllerBase
    {
        private readonly TaskManagementContext _context;

        public ProjectController(TaskManagementContext context)
        {
            _context = context;
        }

        [HttpGet("/get_project/{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();
            return project;
        }

        [HttpPost("/create_project/")]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("/update_project/{id}")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            if (id != project.Id) return BadRequest();

            _context.Entry(project).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Projects.Any(e => e.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("/delete_project/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
