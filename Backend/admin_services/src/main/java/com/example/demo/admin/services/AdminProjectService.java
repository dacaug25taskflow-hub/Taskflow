package com.example.demo.admin.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.admin.dto.*;
import com.example.demo.entities.Domain;
import com.example.demo.entities.Project;
import com.example.demo.entities.User;
import com.example.demo.repositories.DomainRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class AdminProjectService {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;
    private final DomainRepository domainRepo;

    public AdminProjectService(
            ProjectRepository projectRepo,
            UserRepository userRepo,
            DomainRepository domainRepo
    ) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.domainRepo = domainRepo;
    }

    // ---------------- CREATE ----------------
    public Project createProject(AdminCreateProjectDto dto) {

        if (projectRepo.existsByPname(dto.getPname()))
            throw new RuntimeException("Project name exists");

        User user = userRepo.findById(dto.getUid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Domain domain = domainRepo.findById(dto.getDomainId())
                .orElseThrow(() -> new RuntimeException("Domain not found"));

        Project p = new Project();
        p.setPname(dto.getPname());
        p.setPdescription(dto.getPdescription());
        p.setUser(user);
        p.setDomain(domain);                // ⭐ IMPORTANT
        p.setClient(dto.getClient());
        p.setAsDate(LocalDate.now());       // safer than dto
        p.setDeadline(dto.getDeadline());
        p.setComment(dto.getComment());

        return projectRepo.save(p);
    }

    // ---------------- UPDATE ----------------
    public Project updateProject(int pid, AdminUpdateProjectDto dto) {

        Project p = projectRepo.findById(pid)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        p.setPdescription(dto.getPdescription());
        p.setClient(dto.getClient());
        p.setDeadline(dto.getDeadline());
        p.setComment(dto.getComment());

        // optional domain update
        if (dto.getDomainId() != null) {
            Domain domain = domainRepo.findById(dto.getDomainId())
                    .orElseThrow(() -> new RuntimeException("Domain not found"));
            p.setDomain(domain);
        }

        return projectRepo.save(p);
    }

    // ---------------- DELETE ----------------
    public void deleteProject(int pid) {
        projectRepo.deleteById(pid);
    }

    // ---------------- GET ALL ----------------
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepo.findAll();
        return projects.stream().map(this::convertToDto).toList();
    }

    // ---------------- GET BY ID ----------------
    public ProjectDto getProjectById(int pid) {
        Project project = projectRepo.findById(pid)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return convertToDto(project);
    }

    // ---------------- CONVERT TO DTO ----------------
    private ProjectDto convertToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setPid(project.getPid());
        dto.setPname(project.getPname());
        dto.setPdescription(project.getPdescription());
        dto.setClient(project.getClient());
        dto.setDeadline(project.getDeadline());
        dto.setComment(project.getComment());
        dto.setAsDate(project.getAsDate());
        
        // Manager information
        if (project.getUser() != null) {
            dto.setManagerId(project.getUser().getUid());
            dto.setManagerName(project.getUser().getFname() + " " + project.getUser().getLname());
        }
        
        // Domain information
        if (project.getDomain() != null) {
            dto.setDomainId(project.getDomain().getDomainId());
            dto.setDomainName(project.getDomain().getDname());
        }
        
        return dto;
    }

    // ---------------- ASSIGN USER ----------------
    public Project assignProject(int pid, int uid) {

        Project project = projectRepo.findById(pid)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.setUser(user);
        return projectRepo.save(project);
    }

    // ---------------- COUNT ----------------
    public long getProjectCount() {
        return projectRepo.count();
    }
}
