package com.example.internshipHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "quiz_attempts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizAttempt {
    @Id
    private String id;
    private String quizTitle;
    private String quizId;
    private String studentEmail;
    private int quizScore;
}

