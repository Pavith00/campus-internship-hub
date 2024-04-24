package com.example.internshipHub.repository;

import com.example.internshipHub.model.Student;
import com.example.internshipHub.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    // Additional methods if needed

    Student findByUsername(String username);

    boolean existsByUsername(String username);

    String deleteByUsername(String username);
}
