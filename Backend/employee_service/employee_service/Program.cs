using employee_service.Models;
using employee_service.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ===================================
// CONTROLLERS
// ===================================
builder.Services.AddControllers();

// ===================================
// CORS
// ===================================
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ===================================
// DATABASE (MySQL)
// ===================================
builder.Services.AddDbContext<TaskflowdbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

// ===================================
// APPLICATION SERVICES
// ===================================
builder.Services.AddScoped<EmployeeTaskService>();
builder.Services.AddScoped<EmployeeQueryService>();

// ❌ AUTH DISABLED FOR DEV
// builder.Services.AddAuthentication();
// builder.Services.AddAuthorization();

// ===================================
// SWAGGER (NO AUTH UI)
// ===================================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "employee_service",
        Version = "v1"
    });
});

var app = builder.Build();

// ===================================
// MIDDLEWARE
// ===================================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
// app.UseHttpsRedirection(); // Disabled for local HTTP

// ❌ AUTH MIDDLEWARE DISABLED
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();
app.Run();
