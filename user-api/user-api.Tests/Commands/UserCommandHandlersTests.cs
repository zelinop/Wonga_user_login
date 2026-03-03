using Microsoft.EntityFrameworkCore;
using user_api;
using user_api.Commands;
using user_api.Models;
using Xunit;

namespace user_api.Tests.Commands;

public class UserCommandHandlersTests
{
    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task AddUserHandler_Should_Add_User()
    {
        await using var context = CreateDbContext();
        var handler = new AddUserHandler(context);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = "john@example.com",
            Password = "password",
            FirstName = "John",
            LastName = "Doe"
        };

        var result = await handler.Handle(new AddUserCommand(user), CancellationToken.None);

        Assert.Equal(user.Email, result.Email);
        Assert.Single(context.Users);
    }

    [Fact]
    public async Task GetUserCommandHandler_Should_Return_User_When_Exists()
    {
        await using var context = CreateDbContext();
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = "jane@example.com",
            Password = "password",
            FirstName = "Jane",
            LastName = "Doe"
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var handler = new GetUserCommandHandler(context);
        var result = await handler.Handle(new GetUserCommand(user.Id), CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(user.Id, result!.Id);
    }
}
