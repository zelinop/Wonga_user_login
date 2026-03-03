using MediatR;
using Microsoft.EntityFrameworkCore;
using user_api.Models;

namespace user_api.Commands
{
    public class GetUserCommand : IRequest<User?>
    {
        public Guid Id { get; }

        public GetUserCommand(Guid id)
        {
            Id = id;
        }
    }

    public class GetUserCommandHandler(AppDbContext context) : IRequestHandler<GetUserCommand, User?>
    {
        public async Task<User?> Handle(GetUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await context.Users.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

                return user;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}