using MediatR;
using user_api.Models;
using Microsoft.EntityFrameworkCore;

namespace user_api.Commands
{
    public class LoginUserCommand : IRequest<User>
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class LoginUserCommandHandler(AppDbContext context) : IRequestHandler<LoginUserCommand, User>
    {
        public async Task<User> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

                if (user == null) 
                {
                    throw new UnauthorizedAccessException("Invalid email.");
                }

                if (!VerifyPassword(request.Password, user.Password))
                {
                    throw new UnauthorizedAccessException("Invalid password.");
                }

                return user;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while processing the login request.", ex);

            }
        }

        private bool VerifyPassword(string requestPassword, string dbPassword)
        {
            return requestPassword == dbPassword;
        }
    }
}