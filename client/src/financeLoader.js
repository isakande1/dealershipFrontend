import React, { useState, useEffect } from "react";
import './App.css';

export default function FinanceLoader({ messages }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (currentMessageIndex < messages.length - 1) {
            // Update message index if not at the end
            setCurrentMessageIndex((prevIndex) => prevIndex + 1);
        } else {
            // Set finished flag to true on reaching the last message
            setIsFinished(true);
            clearInterval(intervalId); // Stop the interval
        }
    }, 1000);

    setIsFinished(true);
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [messages]); // Dependency array ensures effect runs only when messages change

  return (
    <div id="progress-container">
      <div class="progress-loader">
        <div class="progress"></div>
        <p id="loading-message">{isFinished ? messages[currentMessageIndex] : messages[messages.length - 1]}</p>
      </div>
    </div>
  );
}