using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPIs.Models;

public partial class Priority
{
    public int Id { get; set; }

    /// <summary>
    /// Low, medium, high, urgent
    /// </summary>
    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
