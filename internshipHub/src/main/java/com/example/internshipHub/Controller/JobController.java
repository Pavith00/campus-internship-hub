package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.JobService;
import com.example.internshipHub.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
public class JobController {

    @Autowired
    private JobService service;

    @GetMapping
    public List<Job> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("/{title}")
    public Job getJob(@PathVariable String title){
        return service.getJob(title);
    }

    @GetMapping("/location/{location}")
    public List<Job> getJobsByLocation(@PathVariable String location){
        return service.getJobsByLocation(location);
    }

    @GetMapping("/search")
    public List<Job> searchJobs(@RequestParam("query") String query){
        return service.searchJobs(query);
    }

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public String addJob(@RequestBody Job job){
        return service.addJob(job);
    }

    @PutMapping
    public String updateJob(@RequestBody Job job){
        return service.updateJob(job);
    }

    @DeleteMapping("/{title}")
    public String deleteJob(@PathVariable String title){
        return service.deleteJob(title);
    }
}

