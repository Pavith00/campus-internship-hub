package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Student;
import com.example.internshipHub.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        try {
            return studentRepository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching students", e);
        }
    }

    public Student getStudent(String id) {
        try {
            return studentRepository.findById(id).orElse(null);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching student", e);
        }
    }

    public String addStudent(Student student) {
        try {
            studentRepository.save(student);
            return "Student added successfully";
        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding student", e);
        }
    }

    public String updateStudent(String id, Student student) {
        try {
            if (studentRepository.existsById(id)) {
                student.setId(id);
                studentRepository.save(student);
                return "Student updated successfully";
            } else {
                return "Student with id " + id + " not found";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while updating student", e);
        }
    }

    public String deleteStudent(String id) {
        try {
            if (studentRepository.existsById(id)) {
                studentRepository.deleteById(id);
                return "Student deleted successfully";
            } else {
                return "Student with id " + id + " not found";
            }
        } catch (Exception e) {
            throw new ServiceException("Error occurred while deleting student", e);
        }
    }
}
