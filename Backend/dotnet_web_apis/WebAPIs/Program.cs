using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApiDocument();

builder.Services.AddDbContext<WebAPIs.Models.TaskManagementContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("MyDb"),
        new MySqlServerVersion(new Version(8, 0, 33))
    ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
