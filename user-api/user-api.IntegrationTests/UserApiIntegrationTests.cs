using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Xunit;

namespace user_api.IntegrationTests;

public class UserApiIntegrationTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public UserApiIntegrationTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Register_Should_Return_Ok_And_User()
    {
        var uniqueEmail = $"user-{Guid.NewGuid():N}@example.com";

        var registerResponse = await _client.PostAsJsonAsync("/api/user/register", new
        {
            email = uniqueEmail,
            password = "password",
            firstName = "John",
            lastName = "Doe"
        });

        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);

        var registerContent = await registerResponse.Content.ReadAsStringAsync();
        using var registerJson = JsonDocument.Parse(registerContent);
        var returnedEmail = registerJson.RootElement.GetProperty("user").GetProperty("email").GetString();

        Assert.Equal(uniqueEmail, returnedEmail);
    }

    [Fact]
    public async Task GetUser_Without_Token_Should_Return_Unauthorized()
    {
        var response = await _client.GetAsync($"/api/user/user/{Guid.NewGuid()}");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}
