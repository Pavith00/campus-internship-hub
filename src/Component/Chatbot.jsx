import React, { useState } from 'react';
import './Chatbot.css'; // Import the CSS file for styling

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleUserMessage = (e) => {
    e.preventDefault();
    const userInput = e.target.message.value;
    setMessages([
      ...messages,
      { sender: 'user', text: userInput },
      { sender: 'bot', text: getBotResponse(userInput) }
    ]);
    // Clear the input field after sending the message
    e.target.message.value = '';
  };

  const getBotResponse = (userInput) => {
    let botResponse = '';

    // Simple keyword-based response generation
    if (userInput.includes('web application')) {
      botResponse = 'A web application is a software application that runs on a web server and is accessed through a web browser.';
    } else if (userInput.includes('React')) {
      botResponse = 'React is a JavaScript library for building user interfaces.';
    } else {
      botResponse = 'I am sorry, I do not understand your question.';
    }

    return botResponse;
  };

  return (
    <div className="chatbot">
      <div className="header">
        Chatbot
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <div className={`message ${message.sender}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input">
        <form onSubmit={handleUserMessage}>
          <input type="text" name="message" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
