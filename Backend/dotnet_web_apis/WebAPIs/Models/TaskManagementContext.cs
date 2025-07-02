using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace WebAPIs.Models;

public partial class TaskManagementContext : DbContext
{
    public TaskManagementContext()
    {
    }

    public TaskManagementContext(DbContextOptions<TaskManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Priority> Priorities { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProject> UserProjects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Priority>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("priority");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Name, "name_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasComment("Low, medium, high, urgent")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("projects");

            entity.HasIndex(e => e.CreatedBy, "created_by_fk_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Description)
                .HasMaxLength(45)
                .HasDefaultValueSql("'No description'")
                .HasColumnName("description");
            entity.Property(e => e.IsArchived).HasColumnName("is_archived");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasDefaultValueSql("'Untitled'")
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Projects)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("created_by_fk");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Name, "owner_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasComment("Owner, editor, viewer")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("status");

            entity.HasIndex(e => e.Id, "idstatus_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Name, "name_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasComment("Not Started\nIn Progress\nComplete")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tasks");

            entity.HasIndex(e => e.AssignedTo, "assigned_to_fk1_idx");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Priority, "priority_fk1_idx");

            entity.HasIndex(e => e.ProjectId, "project_id_fk1_idx");

            entity.HasIndex(e => e.Status, "status_fk1_idx");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssignedTo).HasColumnName("assigned_to");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(45)
                .HasDefaultValueSql("'None'")
                .HasColumnName("description");
            entity.Property(e => e.DueDate)
                .HasColumnType("datetime")
                .HasColumnName("due_date");
            entity.Property(e => e.Priority).HasColumnName("priority");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.AssignedTo)
                .HasConstraintName("assigned_to_fk1");

            entity.HasOne(d => d.PriorityNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Priority)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("priority_fk1");

            entity.HasOne(d => d.Project).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("project_id_fk1");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("status_fk1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(45)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(45)
                .HasColumnName("last_name");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(200)
                .HasColumnName("password_hash");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<UserProject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user_projects");

            entity.HasIndex(e => e.Id, "id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.ProjectId, "project_id_fk_idx");

            entity.HasIndex(e => e.Role, "role_fk_idx");

            entity.HasIndex(e => e.UserId, "user_id_fk_idx");

            entity.Property(e => e.Id)
                .HasComment("This table shows relationships between multiple projects and users. One user can own many projects. One project can be owned by many users.\n")
                .HasColumnName("id");
            entity.Property(e => e.JoinedAt)
                .HasColumnType("datetime")
                .HasColumnName("joined_at");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Project).WithMany(p => p.UserProjects)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("project_id_fk");

            entity.HasOne(d => d.RoleNavigation).WithMany(p => p.UserProjects)
                .HasForeignKey(d => d.Role)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("role_fk");

            entity.HasOne(d => d.User).WithMany(p => p.UserProjects)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_id_fk");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
