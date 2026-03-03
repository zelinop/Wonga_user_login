using MediatR;
using user_api.Models;

namespace user_api.Commands
{
    public class AddUserCommand : IRequest<User>
    {
        public User User { get; }

        public AddUserCommand(User user)
        {
            User = user;
        }
    }

    public class AddUserHandler : IRequestHandler<AddUserCommand, User>
    {
        private readonly AppDbContext _context;
        public AddUserHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.User;
            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            return user;
        }
    }
}