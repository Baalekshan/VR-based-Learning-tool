using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace VRGroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VRSessionController : ControllerBase
    {
        private static readonly Dictionary<string, VRSession> _sessions = new Dictionary<string, VRSession>();

        [HttpPost("start")]
        public ActionResult<VRSession> StartSession([FromBody] VRSessionRequest request)
        {
            var sessionId = Guid.NewGuid().ToString();
            var session = new VRSession
            {
                Id = sessionId,
                UserId = request.UserId,
                StartTime = DateTime.UtcNow,
                Status = "active"
            };

            _sessions[sessionId] = session;
            
            return Ok(session);
        }

        [HttpPost("{sessionId}/end")]
        public ActionResult EndSession(string sessionId)
        {
            if (!_sessions.ContainsKey(sessionId))
            {
                return NotFound();
            }

            var session = _sessions[sessionId];
            session.EndTime = DateTime.UtcNow;
            session.Status = "completed";
            
            return Ok(new { message = "Session ended successfully" });
        }

        [HttpGet("{sessionId}")]
        public ActionResult<VRSession> GetSession(string sessionId)
        {
            if (!_sessions.ContainsKey(sessionId))
            {
                return NotFound();
            }

            return Ok(_sessions[sessionId]);
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<VRSession>> GetUserSessions(string userId)
        {
            var userSessions = _sessions.Values.Where(s => s.UserId == userId).ToList();
            return Ok(userSessions);
        }
    }

    public class VRSessionRequest
    {
        public string UserId { get; set; } = string.Empty;
    }

    public class VRSession
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Status { get; set; } = string.Empty;
    }
} 