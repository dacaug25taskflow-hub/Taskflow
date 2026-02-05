package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.SplitTaskDto;
import com.example.demo.entities.Task;
import com.example.demo.entities.TLQuery;
import com.example.demo.entities.Team;
import com.example.demo.repositories.QueryRepository;
import com.example.demo.repositories.TaskRepository;
import com.example.demo.repositories.TeamRepository;

@Service
public class TLTaskService {

    private final TaskRepository taskRepo;
    private final TeamRepository teamRepo;
    private final QueryRepository queryRepo;

    public TLTaskService(TaskRepository taskRepo,
                         TeamRepository teamRepo,
                         QueryRepository queryRepo) {
        this.taskRepo = taskRepo;
        this.teamRepo = teamRepo;
        this.queryRepo = queryRepo;
    }

    // ================= TASKS ASSIGNED TO TL =================
    public List<Task> getTasksAssignedToTL(Long tlUid) {
        return taskRepo.findByUid(tlUid);
    }

    // ================= VIEW TASKS =================
    public List<Task> getTasksByProject(Long pid) {
        return taskRepo.findByPid(pid);
    }

    // ================= ASSIGN TASK TO EMPLOYEE =================
    public Task assignToEmployee(Long taskId, Long empUid) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Long pid = task.getPid();

        boolean exists = teamRepo.findByPid(pid)
                .stream()
                .anyMatch(t -> t.getUid().equals(empUid));

        if (!exists) {
            throw new RuntimeException("Employee not part of this project");
        }

        task.setUid(empUid);
        task.setStatus("TODO");
        return taskRepo.save(task);
    }

    // ================= UPDATE STATUS =================
    public Task updateStatus(Long taskId, String status) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        String s = status.toUpperCase();

        if (!List.of("TODO", "IN_PROGRESS", "DONE").contains(s)) {
            throw new RuntimeException("Invalid status");
        }

        task.setStatus(s);
        return taskRepo.save(task);
    }

    // ================= PROJECT PROGRESS =================
    public double projectProgress(Long pid) {

        List<Task> tasks = taskRepo.findByPid(pid);

        long completed = tasks.stream()
                .filter(t -> "DONE".equalsIgnoreCase(t.getStatus()))
                .count();

        return tasks.isEmpty() ? 0 : (completed * 100.0 / tasks.size());
    }

    // ================= SPLIT TASK =================
    public Task splitTask(SplitTaskDto dto, Long tlUid) {

        Task parent = taskRepo.findById(dto.getParentTaskId())
                .orElseThrow(() -> new RuntimeException("Parent task not found"));

        Task child = new Task();

        child.setPid(parent.getPid());
        child.setDomainId(parent.getDomainId());
        child.setPriority(parent.getPriority());

        child.setTname(dto.getTname());
        child.setTdescription(dto.getTdescription());
        child.setStartDate(dto.getStartDate());
        child.setEndDate(dto.getEndDate());

        child.setStatus("TODO");

        // IMPORTANT: uid cannot be null → TL owns temporarily
        child.setUid(tlUid);

        return taskRepo.save(child);
    }

    // ================= APPROVE TASK =================
    public Task approveTask(Long taskId) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("DONE");
        return taskRepo.save(task);
    }

    // ================= REJECT TASK =================
    public Task rejectTask(Long taskId, String reason, Long managerUid) {

        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("REJECTED");
        taskRepo.save(task);

        // find team id
        Team team = teamRepo.findByPid(task.getPid())
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Team not found"));

        TLQuery q = new TLQuery();
        q.setQuery(reason);
        q.setProjectId(task.getPid());
        q.setTeamIdFk(team.getTeamId());
        q.setManagerUid(managerUid);
        q.setStatus("OPEN");

        queryRepo.save(q);

        return task;
    }
}
