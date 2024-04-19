package com.example.internshipHub.Service;

import com.example.internshipHub.model.Question;
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
public class QuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRepository quizRepository;

    @Autowired
    public QuizAttemptService(QuizAttemptRepository quizAttemptRepository, QuizRepository quizRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizRepository = quizRepository;
    }

    public void saveQuizAttempt(QuizAttempt quizAttempt) {
        quizAttemptRepository.save(quizAttempt);
    }

    public int attemptQuiz(QuizAttemptRequest attemptRequest) {
        String quizId = attemptRequest.getQuizId();
        String studentEmail = attemptRequest.getStudentEmail();
        List<Integer> studentAnswers = attemptRequest.getAnswers();

        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

        List<Integer> correctAnswers = quiz.getQuestions().stream()
                .map(Question::getCorrectAnswer)
                .collect(Collectors.toList());

        int correctCount = 0;
        for (int i = 0; i < Math.min(studentAnswers.size(), correctAnswers.size()); i++) {
            if (studentAnswers.get(i) != null && studentAnswers.get(i).equals(correctAnswers.get(i))) {
                correctCount++;
            }
        }

        int totalQuestions = Math.min(studentAnswers.size(), correctAnswers.size());
        int quizScore = (int) (((double) correctCount / totalQuestions) * 100); // Calculate score as percentage

        // Save quiz attempt including student email, quiz score, and quiz title
        QuizAttempt quizAttempt = new QuizAttempt();
        quizAttempt.setQuizId(quizId);
        quizAttempt.setQuizTitle(quiz.getTitle()); // Set quiz title
        quizAttempt.setStudentEmail(studentEmail);
        quizAttempt.setQuizScore(quizScore);
        quizAttemptRepository.save(quizAttempt);

        return quizScore; // Return the quiz score
    }
}
