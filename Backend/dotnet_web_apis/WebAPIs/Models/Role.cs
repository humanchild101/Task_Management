using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebAPIs.Models;

public partial class Role
{
    public int Id { get; set; }

    /// <summary>
    /// Owner, editor, viewer
    /// </summary>
    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
}
