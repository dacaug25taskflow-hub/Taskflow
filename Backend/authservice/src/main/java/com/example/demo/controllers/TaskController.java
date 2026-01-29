	package com.example.demo.controllers;
	
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.*;
	
	import com.example.demo.entities.Task;
	import com.example.demo.services.TaskService;
	
	@RestController
	@RequestMapping("/task")
	@CrossOrigin(origins = "*")
	public class TaskController {
	
	    @Autowired
	    private TaskService taskService;
	
	    // CREATE task
	    @PostMapping("/save")
	    public Task saveTask(@RequestBody Task task) {
	        return taskService.saveTask(task);
	    }
	
	    // GET task by id
	    @GetMapping("/get/{id}")
	    public Task getTaskById(@PathVariable int id) {
	        return taskService.getTaskById(id);
	    }
	
	    // GET tasks by project
	    @GetMapping("/getbyproject/{pid}")
	    public List<Task> getTasksByProject(@PathVariable int pid) {
	        return taskService.getTasksByProject(pid);
	    }
	
	    // GET tasks by user
	    @GetMapping("/getbyuser/{uid}")
	    public List<Task> getTasksByUser(@PathVariable int uid) {
	        return taskService.getTasksByUser(uid);
	    }
	
	    // GET tasks by status
	    @GetMapping("/getbystatus/{status}")
	    public List<Task> getTasksByStatus(@PathVariable String status) {
	        return taskService.getTasksByStatus(status);
	    }
	
	    // GET all tasks
	    @GetMapping("/all")
	    public List<Task> getAllTasks() {
	        return taskService.getAllTasks();
	    }
	
	    // DELETE task
	    @DeleteMapping("/delete/{id}")
	    public String deleteTask(@PathVariable int id) {
	        taskService.deleteTask(id);
	        return "Task deleted successfully";
	    }
	}