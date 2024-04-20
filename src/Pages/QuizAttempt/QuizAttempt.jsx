import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizAttempt.css'

function QuizAttempt({ studentEmail }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [userEmail, setUserEmail] = useState(studentEmail);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/quizzes");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setQuizScore(null); // Reset quiz score when a new quiz is selected
  };

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedQuiz || selectedAnswers.length !== selectedQuiz.questions.length || !userEmail) {
        throw new Error("Please select all answers and provide your email before submitting.");
      }
      const response = await axios.post("http://localhost:8080/api/quizzes/attempts/attempt", {
        quizId: selectedQuiz.id,
        studentEmail: userEmail,
        answers: selectedAnswers
      });
      setQuizScore(response.data); // Set quiz score received from the backend response
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz");
    }
  };

  return (
    <section className="quiz-container">
      <br></br><br></br><br></br>
      <h1>Attempt Quiz</h1>
      <div className="quiz-list">
        <h2>Available Quizzes</h2>
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              <button onClick={() => handleQuizSelection(quiz)}>{quiz.title}</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedQuiz && (
        <div className="attempt-section">
          <h2>{selectedQuiz.title}</h2>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <input 
              type="email" 
              id="email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)} 
              required 
            />
          </div>
          {selectedQuiz.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <p>{question.question}</p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`answer-${questionIndex}`}
                    value={optionIndex}
                    checked={selectedAnswers[questionIndex] === optionIndex}
                    onChange={() => handleAnswerSelection(questionIndex, optionIndex)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
          {quizScore !== null && <p>Quiz submitted successfully! Your score: {quizScore}%</p>}
        </div>
      )}
    </section>
  );
}

export default QuizAttempt;
