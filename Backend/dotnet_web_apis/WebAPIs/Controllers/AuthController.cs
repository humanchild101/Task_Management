using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using WebAPIs.Models;
using WebAPIs.Services;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute; //?

namespace WebAPIs.Controllers;

[ApiController]
[Route("auth")]


public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel request)
    {
        var result = await _jwtService.Authenticate(request);
        if (result is null)
        {
            return Unauthorized();
        }
        return result;
    }

}