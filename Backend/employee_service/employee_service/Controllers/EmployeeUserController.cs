using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using employee_service.Models;

namespace employee_service.Controllers
{
    [ApiController]
    [Route("api/employee/users")]
    public class EmployeeUserController : ControllerBase
    {
        private readonly TaskflowdbContext _context;

        public EmployeeUserController(TaskflowdbContext context)
        {
            _context = context;
        }

        [HttpGet("{uid}")]
        public async Task<IActionResult> GetProfile(int uid)
        {
            var user = await _context.Users
                .Where(u => u.Uid == uid)
                .Select(u => new
                {
                    u.Uid,
                    u.Uname,
                    u.Email,
                    u.Phone,
                    u.Fname,
                    u.Lname,
                    u.Address,
                    Role = u.Role != null ? u.Role.Rname : null
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        [HttpPut("{uid}/profile")]
        public async Task<IActionResult> UpdateProfile(
            int uid,
            [FromBody] ProfileUpdateRequest req)
        {
            var user = await _context.Users.FindAsync(uid);
            if (user == null)
                return NotFound("User not found");

            if (req.Fname != null) user.Fname = req.Fname;
            if (req.Lname != null) user.Lname = req.Lname;
            if (req.Email != null && req.Email.Length > 0) user.Email = req.Email;
            if (req.Phone != null) user.Phone = req.Phone;
            if (req.Address != null) user.Address = req.Address;

            await _context.SaveChangesAsync();
            return Ok(new { Message = "Profile updated successfully" });
        }

        [HttpPut("{uid}/password")]
        public async Task<IActionResult> ChangePassword(
            int uid,
            [FromBody] ChangePasswordRequest req)
        {
            var user = await _context.Users.FindAsync(uid);
            if (user == null)
                return NotFound("User not found");

            if (user.Pwd != req.CurrentPassword)
                return BadRequest("Current password is incorrect");

            user.Pwd = req.NewPassword;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Password updated successfully" });
        }

        public class ChangePasswordRequest
        {
            public string CurrentPassword { get; set; } = null!;
            public string NewPassword { get; set; } = null!;
        }

        public class ProfileUpdateRequest
        {
            public string? Fname { get; set; }
            public string? Lname { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
            public string? Address { get; set; }
        }
    }
}
