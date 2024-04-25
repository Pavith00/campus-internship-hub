package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Quiz;
import com.example.internshipHub.model.QuizAttempt;
import com.example.internshipHub.model.QuizAttemptRequest;
import com.example.internshipHub.repository.QuizAttemptRepository;
import com.example.internshipHub.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class QuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz uploadQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(String id) {
        return quizRepository.findById(id).orElse(null);
    }

    public String deleteQuizByTitle(String quizTitle) {
        Quiz quiz = quizRepository.findByTitle(quizTitle);
        if (quiz != null) {
            quizRepository.delete(quiz);
            return "Quiz deleted successfully";
        } else {
            return "Quiz not found";
        }
    }

    public int attemptQuiz(QuizAttemptRequest attemptRequest) {
        String quizId = attemptRequest.getQuizId();
        List<Integer> studentAnswers = attemptRequest.getAnswers();

        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) {
            throw new IllegalArgumentException("Quiz not found");
        }

        List<Integer> correctAnswers = quiz.getQuestions().stream()
                .map(question -> question.getCorrectAnswer())
                .collect(Collectors.toList());

        int correctCount = 0;
        for (int i = 0; i < Math.min(studentAnswers.size(), correctAnswers.size()); i++) {
            if (studentAnswers.get(i) != null && studentAnswers.get(i).equals(correctAnswers.get(i))) {
                correctCount++;
            }
        }

        int totalQuestions = Math.min(studentAnswers.size(), correctAnswers.size());
        return (int) (((double) correctCount / totalQuestions) * 100);
    }

}
