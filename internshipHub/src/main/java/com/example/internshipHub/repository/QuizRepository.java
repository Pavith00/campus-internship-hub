package com.example.internshipHub.repository;

import com.example.internshipHub.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    void deleteByTitle(String quizTitle);

    boolean existsByTitle(String quizTitle);

    Quiz findByTitle(String quizTitle);
}