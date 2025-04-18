import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/CommunicationQuizStyles.css";
import { submitScore } from '../utils/submitScore';
import useAuth from "../utils/UseAuth";
import selectionBg from "../assets/selectionBg.jpg";

interface Question {
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  [key: string]: Question[];
}

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CommunicationQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string>("communicationQuiz");
  const { user } = useAuth();
  const QUESTIONS_LIMIT = 5;

  useEffect(() => {
    fetch("quizData.json")
      .then((response) => response.json())
      .then((data: QuizData) => {
        setQuizData(data);
        
        // Get all questions for the selected quiz type
        const allQuestions = data[selectedQuiz] || [];
        
        // Shuffle and limit to 5 random questions
        const shuffledQuestions = shuffleArray(allQuestions);
        const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_LIMIT);
        
        setQuestions(selectedQuestions);
      })
      .catch((error) => console.error("Error loading quiz data:", error));
  }, [selectedQuiz]);

  const handleAnswer = (selectedAnswer: string) => {
    let newScore = score;
    if (questions[currentQuestion]?.correctAnswer === selectedAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setQuizCompleted(true);
      if (user?.email) {
        submitScore("communication-quiz", newScore, user.email);
      }
    }
  };

  const handleRestart = () => {
    // Reshuffle questions when restarting
    if (quizData) {
      const allQuestions = quizData[selectedQuiz] || [];
      const shuffledQuestions = shuffleArray(allQuestions);
      const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_LIMIT);
      setQuestions(selectedQuestions);
    }
    
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="quiz-background">
      <div className="quiz-container">
        <h2 className="quiz-title">Communication Quiz</h2>
        <ProgressBar
          animated
          now={((currentQuestion + 1) / questions.length) * 100}
          className="progress-bar-custom"
          style={{ height: "30px", borderRadius: "30px" }}
        />
        {quizCompleted ? (
          <div className="question-card">
            <h2>Quiz Completed! 🎉</h2>
            <h3>Your score is {score}/{questions.length}</h3>
            <button className="restart-button" onClick={handleRestart}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="question-card">
            <h3 className="question-text">{questions[currentQuestion]?.question}</h3>
            {questions[currentQuestion]?.imageUrl && (
              <img
                src={questions[currentQuestion].imageUrl}
                alt="Question"
                className="question-image"
              />
            )}
            <div className="options-list">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationQuiz;
