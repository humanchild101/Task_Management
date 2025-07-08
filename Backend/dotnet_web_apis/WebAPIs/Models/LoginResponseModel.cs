using System.Text.Json.Serialization;

namespace WebAPIs.Models;

public class LoginResponseModel
{
    public string? UserEmail { get; set; }

    [JsonPropertyName("access_token")]
    public string? AccessToken { get; set; }
    public int ExpiresIn { get; set; }
}