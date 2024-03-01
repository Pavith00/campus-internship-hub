package com.example.internshipHub.repository;

import com.example.internshipHub.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    // Additional methods if needed
}
