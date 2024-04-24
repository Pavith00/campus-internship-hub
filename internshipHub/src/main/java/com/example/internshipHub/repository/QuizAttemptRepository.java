package com.example.internshipHub.repository;

import com.example.internshipHub.model.Quiz;
import com.example.internshipHub.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    // You don't need to declare the save method explicitly.
    // Spring Data MongoDB will provide it for you.
    // You can add custom query methods here if needed.
    List<QuizAttempt> findByStudentEmail(String studentEmail);

}