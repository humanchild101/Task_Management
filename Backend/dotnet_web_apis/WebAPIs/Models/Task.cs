using System;
using System.Collections.Generic;

namespace WebAPIs.Models;

public partial class Task
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int ProjectId { get; set; }

    public int? AssignedTo { get; set; }

    public int Status { get; set; }

    public DateTime? DueDate { get; set; }

    public int Priority { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User? AssignedToNavigation { get; set; }

    public virtual Priority PriorityNavigation { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;

    public virtual Status StatusNavigation { get; set; } = null!;
}
