package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.JobService;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.model.LoginDTO;
import com.example.internshipHub.model.Student;
import com.example.internshipHub.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private JobService jobService;

    @GetMapping("/username/{username}/jobs")
    public List<Job> getJobsByStudentUsername(@PathVariable String username) {
        // Assuming studentService has a method findJobsByStudentUsername
        // that returns a list of jobs based on the student's username
        return studentService.findJobsByStudentUsername(username);
    }


    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{username}")
    public Student getStudentByUsername(@PathVariable String username) {
        return studentService.getStudent(username);
    }


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public String addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody LoginDTO loginDTO){
        return studentService.login(loginDTO.getUsername(), loginDTO.getPassword());
    }

    @PutMapping("/{username}")
    public String updateStudent(@PathVariable String username, @RequestBody Student student) {
        return studentService.updateStudent(username, student);
    }

    @DeleteMapping("/{username}")
    public String deleteStudent(@PathVariable String username) {
        return studentService.deleteStudent(username);
    }
}

