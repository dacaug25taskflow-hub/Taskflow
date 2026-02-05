using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace employee_service.Models;

public partial class TaskflowdbContext : DbContext
{
    public TaskflowdbContext()
    {
    }

    public TaskflowdbContext(DbContextOptions<TaskflowdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Domain> Domains { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Query> Queries { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<Team> Teams { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=taskflowdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Domain>(entity =>
        {
            entity.HasKey(e => e.DomainId).HasName("PRIMARY");

            entity.ToTable("domain");

            entity.HasIndex(e => e.Dname, "dname_UNIQUE").IsUnique();

            entity.Property(e => e.DomainId).HasColumnName("domain_id");
            entity.Property(e => e.Dname).HasColumnName("dname");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Pid).HasName("PRIMARY");

            entity.ToTable("project");

            entity.HasIndex(e => e.DomainId, "domain_id_idx");

            entity.HasIndex(e => e.Pid, "pid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Pname, "pname_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.AsDate).HasColumnName("as_date");
            entity.Property(e => e.Client)
                .HasMaxLength(255)
                .HasColumnName("client");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.Deadline).HasColumnName("deadline");
            entity.Property(e => e.DomainId).HasColumnName("domain_id");
            entity.Property(e => e.Pdescription)
                .HasMaxLength(255)
                .HasColumnName("pdescription");
            entity.Property(e => e.Pname).HasColumnName("pname");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Domain).WithMany(p => p.Projects)
                .HasForeignKey(d => d.DomainId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("domain_id");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Projects)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("uid");
        });

        modelBuilder.Entity<Query>(entity =>
        {
            entity.HasKey(e => e.Qid).HasName("PRIMARY");

            entity.ToTable("query");

            entity.HasIndex(e => e.FkPid, "fk_pid_idx");

            entity.HasIndex(e => e.Mgruid, "mgruid_idx");

            entity.HasIndex(e => e.Qid, "qid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.TeamidFk, "teamid_fk_idx");

            entity.Property(e => e.Qid).HasColumnName("qid");
            entity.Property(e => e.FkPid).HasColumnName("fk_pid");
            entity.Property(e => e.Mgruid).HasColumnName("mgruid");
            entity.Property(e => e.Qname)
                .HasMaxLength(255)
                .HasColumnName("qname");
            entity.Property(e => e.RaisedByUid)
                .HasColumnName("raised_by_uid");
            entity.Property(e => e.Query1)
                .HasMaxLength(255)
                .HasColumnName("query");
            entity.Property(e => e.Response)
                .HasMaxLength(255)
                .HasColumnName("response");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.TeamidFk).HasColumnName("teamid_fk");

            entity.HasOne(d => d.FkP).WithMany(p => p.Queries)
                .HasForeignKey(d => d.FkPid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_pid");

            entity.HasOne(d => d.Mgru).WithMany(p => p.Queries)
                .HasForeignKey(d => d.Mgruid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("mgruid");

            entity.HasOne(d => d.TeamidFkNavigation).WithMany(p => p.Queries)
                .HasForeignKey(d => d.TeamidFk)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("teamid_fk");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.HasIndex(e => e.Rname, "rname_UNIQUE").IsUnique();

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Rname).HasColumnName("rname");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PRIMARY");

            entity.ToTable("task");

            entity.HasIndex(e => e.DomainId, "fk_task_domain");

            entity.HasIndex(e => e.Pid, "fk_task_project");

            entity.HasIndex(e => e.Tname, "tname_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.DomainId).HasColumnName("domain_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Priority)
                .HasMaxLength(255)
                .HasColumnName("priority");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.Tdescription)
                .HasMaxLength(255)
                .HasColumnName("tdescription");
            entity.Property(e => e.Tname).HasColumnName("tname");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Domain).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.DomainId)
                .HasConstraintName("fk_task_domain");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_project");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_task_user");
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.TeamId).HasName("PRIMARY");

            entity.ToTable("team");

            entity.HasIndex(e => e.Pid, "pid_idx");

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.TeamId).HasColumnName("team_id");
            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.Teams)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Teams)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("uid_fk");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.DomainId, "FKk1hsftp46a7obygffmevl2g3s");

            entity.HasIndex(e => e.RoleId, "fk_user_role");

            entity.HasIndex(e => e.Uname, "uname_UNIQUE").IsUnique();

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.DomainId).HasColumnName("domain_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(255)
                .HasColumnName("fname");
            entity.Property(e => e.Lname)
                .HasMaxLength(255)
                .HasColumnName("lname");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.Pwd)
                .HasMaxLength(255)
                .HasColumnName("pwd");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Uname).HasColumnName("uname");

            entity.HasOne(d => d.Domain).WithMany(p => p.Users)
                .HasForeignKey(d => d.DomainId)
                .HasConstraintName("FKk1hsftp46a7obygffmevl2g3s");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
