$ErrorActionPreference = 'Stop'

Write-Host "Restoring..."
dotnet restore user-api.csproj
dotnet restore user-api.Tests/user-api.Tests.csproj
dotnet restore user-api.IntegrationTests/user-api.IntegrationTests.csproj

Write-Host "Building API..."
dotnet build user-api.csproj --no-restore

Write-Host "Running unit tests..."
dotnet test user-api.Tests/user-api.Tests.csproj --no-restore

Write-Host "Running integration tests..."
dotnet test user-api.IntegrationTests/user-api.IntegrationTests.csproj --no-restore

Write-Host "Building Docker images..."
docker compose build

Write-Host "Build script completed successfully."
