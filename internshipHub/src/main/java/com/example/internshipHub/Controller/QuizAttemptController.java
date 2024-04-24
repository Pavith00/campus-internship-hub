package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.QuizAttemptService;
import com.example.internshipHub.model.QuizAttempt;
import com.example.internshipHub.model.QuizAttemptRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes/attempts")
public class QuizAttemptController {

        private final QuizAttemptService quizAttemptService;

        @Autowired
        public QuizAttemptController(QuizAttemptService quizAttemptService) {
            this.quizAttemptService = quizAttemptService;
        }

        @PostMapping("/attempt")
        public ResponseEntity<Integer> submitQuizAttempt(@RequestBody QuizAttemptRequest quizAttemptRequest) {
            int quizScore = quizAttemptService.attemptQuiz(quizAttemptRequest);
            return new ResponseEntity<>(quizScore, HttpStatus.CREATED);
        }
    @GetMapping("/{studentEmail}")
    public ResponseEntity<List<QuizAttempt>> getQuizAttemptsByStudentEmail(@PathVariable String studentEmail) {
        List<QuizAttempt> quizAttempts = quizAttemptService.getQuizAttemptsByStudentEmail(studentEmail);
        return new ResponseEntity<>(quizAttempts, HttpStatus.OK);
    }


    // Add more endpoints for fetching quiz attempts, updating attempts, etc.
    }
