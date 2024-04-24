package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.QuizService;
import com.example.internshipHub.model.Quiz;
import com.example.internshipHub.model.QuizAttemptRequest;
import com.example.internshipHub.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public record QuizController(QuizService quizService) {
    @Autowired
    public QuizController {
    }

    @PostMapping("/upload")
    public ResponseEntity<Quiz> uploadQuiz(@RequestBody Quiz quiz) {
        Quiz uploadedQuiz = quizService.uploadQuiz(quiz);
        return new ResponseEntity<>(uploadedQuiz, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable String id) {
        Quiz quiz = quizService.getQuizById(id);
        if (quiz != null) {
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping
    public List<Quiz> getAllQuiz() {
        return quizService.getAllQuizzes();
    }

    @DeleteMapping("/{quizTitle}")
    public String deleteQuiz(@PathVariable String quizTitle) {
        return quizService.deleteQuizByTitle(quizTitle);
    }

    @PostMapping("/attempt")
    public ResponseEntity<Integer> attemptQuiz(@RequestBody QuizAttemptRequest attemptRequest) {
        int finalMarks = quizService.attemptQuiz(attemptRequest);
        return ResponseEntity.ok(finalMarks);
    }


    // Implement other endpoints for quiz management
}