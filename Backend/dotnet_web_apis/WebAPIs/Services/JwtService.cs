using Microsoft.EntityFrameworkCore;
using WebAPIs.Models;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Azure.Core;

namespace WebAPIs.Services;

public class JwtService
{
    private readonly TaskManagementContext _dbContext;
    private readonly IConfiguration _config;
    public JwtService(TaskManagementContext dbContext, IConfiguration config)
    {
        _dbContext = dbContext;
        _config = config;
    }

    public async Task<LoginResponseModel?> Authenticate(LoginRequestModel request)
    {
        if (string.IsNullOrWhiteSpace(request.UserEmail) || string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }
        var userAccount = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == request.UserEmail);
        if (userAccount is null || !BCrypt.Net.BCrypt.Verify(request.Password, userAccount.PasswordHash))
        {
            return null;
        }

        var issuer = _config["JwtConfig:Issuer"];
        var auidence = _config["JwtConfig:Audience"];
        var key = _config["JwtConfig:Key"];
        var tokenValidityMins = _config.GetValue<int>("JwtConfig:TokenValidityMins");
        var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new[]{
                        new Claim(ClaimTypes.NameIdentifier, userAccount.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Email, userAccount.Email),
                        new Claim("firstName", userAccount.FirstName),
                        new Claim("lastName", userAccount.LastName)
            }),
            Expires = tokenExpiryTimeStamp,
            Issuer = issuer,
            Audience = auidence,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha256Signature),
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var accessToken = tokenHandler.WriteToken(securityToken);
        return new LoginResponseModel
        {
            AccessToken = accessToken,
            UserEmail = request.UserEmail,
            ExpiresIn = (int)tokenExpiryTimeStamp.Subtract(DateTime.UtcNow).TotalSeconds
        };
    }


}