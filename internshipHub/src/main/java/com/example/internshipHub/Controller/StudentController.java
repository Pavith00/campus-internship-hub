package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.JobService;
import com.example.internshipHub.model.Job;
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

    @GetMapping("/{studentId}/jobs")
    public List<Job> getJobsByStudentPath(@PathVariable String studentId) {
        // Assuming studentService has a method findJobsByStudentPath
        // that returns a list of jobs based on the student's path
        return studentService.findJobsByStudentPath(studentId);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.getStudent(id);
    }


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public String addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public String updateStudent(@PathVariable String id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        return studentService.deleteStudent(id);
    }
}

