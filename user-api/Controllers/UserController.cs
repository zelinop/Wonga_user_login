using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using user_api.Commands;
using user_api.Dto;
using user_api.Models;
using user_api.Services;

namespace user_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IMediator _mediator;
        private readonly IJwtTokenService _jwtTokenService;

        public UserController(ILogger<UserController> logger, IMediator mediator, IJwtTokenService jwtTokenService)
        {
            _logger = logger;
            _mediator = mediator;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null) 
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = "user cannot be null" });
            }

            try {
                var registerUser = await _mediator.Send( new AddUserCommand(user));

                if (registerUser == null) 
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Error adding user to the database.");
                }

                return StatusCode(StatusCodes.Status200OK, new
                {
                    user = registerUser,
                    message = $"User '{user.Email}' added successfully"
                });
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error adding user with specified email '{email}'", user.Email);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding user to the database.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto dto)
        {
            try
            {
                var user = await _mediator.Send(new LoginUserCommand { Email = dto.Email, Password = dto.Password });
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid email or password.");

                }

                var token = _jwtTokenService.GenerateToken(user);
                return Ok(new
                {
                    token,
                    user,
                    message = $"User '{dto.Email}' logged in successfully"
                });
            }
            catch (UnauthorizedAccessException)
            {
                _logger.LogError("Error logging in user with email '{email}'", dto.Email);
                return StatusCode(StatusCodes.Status401Unauthorized, "Invalid email or password.");
            }
        }

        [Authorize]
        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            try
            {
                var user = await _mediator.Send(new GetUserCommand(id));
                if (user == null) return NotFound();
                return Ok(user);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Error retrieving user with ID '{id}'", id);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving user from the database.");
            }
        }
    }
}
