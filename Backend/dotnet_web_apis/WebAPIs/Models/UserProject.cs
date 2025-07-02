using System;
using System.Collections.Generic;

namespace WebAPIs.Models;

public partial class UserProject
{
    /// <summary>
    /// This table shows relationships between multiple projects and users. One user can own many projects. One project can be owned by many users.
    /// 
    /// </summary>
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ProjectId { get; set; }

    public int Role { get; set; }

    public DateTime JoinedAt { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual Role RoleNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
