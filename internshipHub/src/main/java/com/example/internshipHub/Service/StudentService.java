package com.example.internshipHub.Service;


import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.model.Student;
import com.example.internshipHub.model.User;
import com.example.internshipHub.repository.JobRepository;
import com.example.internshipHub.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Student> getAllStudents() {
        try {
            return studentRepository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching students", e);
        }
    }

    public Student getStudent(String username) {
        try {
            return studentRepository.findById(username)
                    .orElseThrow(() -> new ServiceException("Student not found with username: " + username));
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching student", e);
        }
    }

    public String addStudent(Student student) {
        try {
            studentRepository.save(student);
            return "Student added successfully";
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a student", e);
        }
    }

    public String updateStudent(String id, Student updatedStudent) {
        try {
            if (studentRepository.existsById(id)) {
                updatedStudent.setId(id);
                studentRepository.save(updatedStudent);
                return "Student updated successfully";
            } else {
                throw new ServiceException("Student not found with id: " + id);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while updating a student", e);
        }
    }

    public String deleteStudent(String username) {
        try {
            if (studentRepository.existsByUsername(username)) {
                studentRepository.deleteByUsername(username);
                return username+ "Student deleted successfully";
            } else {
                throw new ServiceException("Student not found with username: " + username);
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while deleting a student", e);
        }
    }

    public List<Job> findJobsByStudentPath(String studentId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student == null) {
            // Handle the case where the student doesn't exist
            return Collections.emptyList();
        }

        // Assuming path is a single string in Student entity
        String path = student.getPath();

        // Now, find all jobs with the same path
        return jobRepository.findByPath(path);
    }

    public boolean login(String username, String password){
        try {
            if(studentRepository.existsByUsername(username)) {
                Student student = studentRepository.findByUsername(username);
                boolean a = passwordEncoder.matches(password, student.getPassword());
                return student != null && a;
            }
            else{
                return false;
            }
        } catch(Exception e){
            throw new ServiceException("Error occurred while login", e);
        }
    }


}


