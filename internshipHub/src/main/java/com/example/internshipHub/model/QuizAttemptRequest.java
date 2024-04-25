package com.example.internshipHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizAttemptRequest {
        private String quizId;
        private String studentEmail;
        private List<Integer> answers;
        private Map<String, Integer> quizScores;


        // Getters and setters
}
