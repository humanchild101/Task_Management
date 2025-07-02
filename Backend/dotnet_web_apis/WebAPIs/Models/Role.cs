using System;
using System.Collections.Generic;

namespace WebAPIs.Models;

public partial class Role
{
    public int Id { get; set; }

    /// <summary>
    /// Owner, editor, viewer
    /// </summary>
    public string Name { get; set; } = null!;

    public virtual ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
}
