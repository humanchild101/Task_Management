using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPIs.Models;

public partial class Project
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int CreatedBy { get; set; }

    public sbyte IsArchived { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    [JsonIgnore]
    public virtual ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
}
