import React, { useState } from 'react';

const QuizApp = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [finalMark, setFinalMark] = useState(null);

  // Function to add a new quiz
  const addQuiz = () => {
    setQuizzes([...quizzes, { title: '', questions: [] }]);
  };

  // Function to handle input change for quiz title
  const handleQuizTitleChange = (index, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index].title = event.target.value;
    setQuizzes(newQuizzes);
  };

  // Function to add a new question to a quiz
  const addQuestion = (quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions.push({ question: '', options: ['', '', ''], correctAnswer: 0 });
    setQuizzes(newQuizzes);
  };

  // Function to handle input change for question
  const handleQuestionChange = (quizIndex, questionIndex, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].question = event.target.value;
    setQuizzes(newQuizzes);
  };

  // Function to handle input change for option
  const handleOptionChange = (quizIndex, questionIndex, optionIndex, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].options[optionIndex] = event.target.value;
    setQuizzes(newQuizzes);
  };

  // Function to handle selection of correct answer
  const handleCorrectAnswerChange = (quizIndex, questionIndex, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].questions[questionIndex].correctAnswer = parseInt(event.target.value);
    setQuizzes(newQuizzes);
  };

  // Function to handle quiz selection
  const handleQuizSelection = (index) => {
    setSelectedQuiz(quizzes[index]);
    setSelectedAnswers(Array(quizzes[index].questions.length).fill(null));
    setSubmitted(false);
    setFinalMark(null);
  };

  // Function to submit quiz
  const handleSubmit = () => {
    // For now, simply logging the selected quiz and answers
    console.log('Selected Quiz:', selectedQuiz);
    console.log('Selected Answers:', selectedAnswers);
    setSubmitted(true);
    // You can implement the logic to calculate the final mark here
    const correctCount = selectedQuiz.questions.reduce((total, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
    const totalQuestions = selectedQuiz.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    setFinalMark(percentage.toFixed(2));
  };

  // Function to submit answers
  const submitAnswers = () => {
    // For now, simply logging the selected quiz and answers
    console.log('Selected Quiz:', selectedQuiz);
    console.log('Selected Answers:', selectedAnswers);
    // You can implement the logic to calculate the final mark here
    setSubmitted(true);
    const correctCount = selectedQuiz.questions.reduce((total, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
    const totalQuestions = selectedQuiz.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    setFinalMark(percentage.toFixed(2));
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      <div>
        <h2>Upload Quizzes</h2>
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <input
              type="text"
              value={quiz.title}
              onChange={(e) => handleQuizTitleChange(index, e)}
              placeholder={`Quiz Title ${index + 1}`}
            />
            <button onClick={() => addQuestion(index)}>Add Question</button>
            <ul>
              {quiz.questions.map((question, questionIndex) => (
                <li key={questionIndex}>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, questionIndex, e)}
                    placeholder={`Question ${questionIndex + 1}`}
                  />
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, questionIndex, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <input
                        type="radio"
                        name={`correctAnswer-${index}-${questionIndex}`}
                        value={optionIndex}
                        checked={question.correctAnswer === optionIndex}
                        onChange={(e) => handleCorrectAnswerChange(index, questionIndex, e)}
                      />
                      <label>Correct Answer</label>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
            <button onClick={() => handleQuizSelection(index)}>Select Quiz</button>
          </div>
        ))}
        <button onClick={addQuiz}>Add Quiz</button>
      </div>
      <hr />
      {selectedQuiz && (
        <div>
          <h2>Attempt Quiz: {selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value={optionIndex}
                    checked={selectedAnswers[index] === optionIndex}
                    onChange={() => {
                      const newSelectedAnswers = [...selectedAnswers];
                      newSelectedAnswers[index] = optionIndex;
                      setSelectedAnswers(newSelectedAnswers);
                    }}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          {submitted ? (
            <div>
              <p>Final Mark: {finalMark}%</p>
            </div>
          ) : (
            <button onClick={handleSubmit}>Submit Quiz</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
