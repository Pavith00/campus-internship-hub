//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.model.Student;
import com.example.internshipHub.repository.JobRepository;
import com.example.internshipHub.repository.StudentRepository;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public StudentService() {
    }

    public List<Student> getAllStudents() {
        try {
            return this.studentRepository.findAll();
        } catch (Exception var2) {
            throw new ServiceException("Error occurred while fetching students", var2);
        }
    }

    public Student getStudent(String username) {
        try {
            return this.studentRepository.findByUsername(username);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching specific user", var3);
        }
    }

    public String addStudent(Student student) {
        try {
            if(!studentRepository.existsByUsername(student.getUsername().trim())) {
                // Remove leading and trailing whitespaces from the username
                student.setUsername(student.getUsername().trim());
                // Hash the password
                student.setPassword(passwordEncoder.encode(student.getRawPassword()));
                // Clear the raw password
                student.setRawPassword(null);
                // Save the student
                studentRepository.save(student);
                return "User " + student.getUsername() + " Saved Successfully";
            }
            else {
                return "Username " + student.getUsername() + " Already Exists";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a user", e);
        }
    }


    public String updateStudent(String id, Student updatedStudent) {
        try {
            if (this.studentRepository.existsById(id)) {
                updatedStudent.setId(id);
                this.studentRepository.save(updatedStudent);
                return "Student updated successfully";
            } else {
                throw new ServiceException("Student not found with id: " + id);
            }
        } catch (Exception var4) {
            throw new ServiceException("Error occurred while updating a student", var4);
        }
    }

    public String deleteStudent(String username) {
        try {
            if (this.studentRepository.existsByUsername(username)) {
                this.studentRepository.deleteByUsername(username);
                return username + "Student deleted successfully";
            } else {
                throw new ServiceException("Student not found with username: " + username);
            }
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while deleting a student", var3);
        }
    }

    public List<Job> findJobsByStudentUsername(String username) {
        Student student = this.studentRepository.findByUsername(username);
        if (student == null) {
            return Collections.emptyList();
        } else {
            String path = student.getPath();
            return this.jobRepository.findByPath(path);
        }
    }

    public boolean login(String username, String password) {
        // Retrieve the student from the database based on the provided username
        Student student = studentRepository.findByUsername(username);

        // Check if the student exists and if the password matches
        if (student != null && passwordEncoder.matches(password, student.getPassword())) {
            // Return true if the credentials are valid
            return true;
        } else {
            // Return false if the credentials are invalid
            return false;
        }
    }


    public void saveQuizScore(String username, String quizId, int score) {
        Student student = this.studentRepository.findByUsername(username);
        if (student != null) {
            student.getQuizScores().put(quizId, score);
            this.studentRepository.save(student);
        }

    }
}
