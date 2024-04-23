import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizUpload.css'

function QuizUpload() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], correctAnswer: 0 }]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

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

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''], correctAnswer: 0 }]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = parseInt(event.target.value);
    setQuestions(newQuestions);
  };

  const handlePreview = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleDeleteQuiz = async (quizTitle) => {
    try {
      await axios.delete(`http://localhost:8080/api/quizzes/${quizTitle}`);
      setQuizzes(quizzes.filter(quiz => quiz.title !== quizTitle));
      setSelectedQuiz(null);
      alert("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("An error occurred while deleting quiz");
    }
  };

  const uploadQuiz = async (e) => {
    e.preventDefault();
    try {
      const uploadResponse = await axios.post("http://localhost:8080/api/quizzes/upload", {
        title: quizTitle,
        questions: questions
      });
      alert("Quiz uploaded successfully");
      setQuizTitle("");
      setQuestions([{ question: '', options: ['', '', ''], correctAnswer: 0 }]);
      setQuizzes([...quizzes, uploadResponse.data]);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error uploading quiz:", error);
      alert("An error occurred while uploading quiz");
    }
  };
  const scrollToSection = (e) => {
    const targetId = e.target.dataset.bsTarget;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/adminLogin');
  };

  return (
    <section className="quiz-container">
      <div className="sidenav">
        <div className='buttons'>
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab">
          <Link to="/quizupload" >
            <button className="btn btn-outline-secondary b" data-bs-target="#home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={scrollToSection}>Quiz Upload</button><br />
            </Link>
            <Link to="/fss" >
            <button className="btn btn-outline-secondary b" data-bs-target="#jobByPath" type="button" role="tab" aria-controls="v-pills-jobByPath" aria-selected="false" onClick={scrollToSection}>Mentor</button><br />
            </Link>
            
          </div>
        </div>
        <hr align="center" />
        <center>
          <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
        </center>
      </div>
      <br></br><br></br>
      <h1>Upload Quiz</h1>
      <form onSubmit={uploadQuiz}>
        <div className="input-box">
          <label>Quiz Title</label>
          <input type="text" placeholder="Enter Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} required />
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <input type="text" placeholder={`Question ${questionIndex + 1}`} value={question.question} onChange={(e) => handleQuestionChange(questionIndex, e)} required />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input type="text" placeholder={`Option ${optionIndex + 1}`} value={option} onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)} required />
                <input type="radio" name={`correctAnswer-${questionIndex}`} value={optionIndex} checked={question.correctAnswer === optionIndex} onChange={(e) => handleCorrectAnswerChange(questionIndex, e)} />
                <label>Correct Answer</label>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Upload Quiz</button>
      </form>

      {selectedQuiz && (
        <div className="preview-section">
          <h2>Preview Quiz</h2>
          <h3>{selectedQuiz.title}</h3>
          {selectedQuiz.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} style={{ fontWeight: question.correctAnswer === optionIndex ? 'bold' : 'normal' }}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="quiz-list">
        <br></br>
        <h2>Available Quizzes</h2>
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              <button onClick={() => handlePreview(quiz)}>{quiz.title}</button>
              <button onClick={() => handleDeleteQuiz(quiz.title)}>Delete Quiz</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default QuizUpload;
