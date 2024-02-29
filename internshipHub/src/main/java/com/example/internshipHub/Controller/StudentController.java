package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.StudentService;
import com.example.internshipHub.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.getStudent(id);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addStudent(@RequestBody Student student) {
        // Initialize paths if not provided
        if (student.getPreferredPaths() == null) {
            student.setPreferredPaths(new ArrayList<>());
        }
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public String updateStudent(@PathVariable String id, @RequestBody Student student) {
        // Initialize paths if not provided
        if (student.getPreferredPaths() == null) {
            student.setPreferredPaths(new ArrayList<>());
        }
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        return studentService.deleteStudent(id);
    }
}
