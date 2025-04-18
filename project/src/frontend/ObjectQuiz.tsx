import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../styles/ObjectQuizStyles.css';
import { submitScore } from '../utils/submitScore';
import useAuth from '../utils/UseAuth';
import selectionBg from '../assets/selectionBg.jpg';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ObjectQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const { user } = useAuth();
  const QUESTIONS_LIMIT = 10;

  useEffect(() => {
    fetch('quizData.json')
      .then(response => response.json())
      .then((data: { objectQuiz: Question[] }) => {
        // Store all available questions
        setAllQuestions(data.objectQuiz);
        
        // Shuffle and select 10 random questions
        const shuffledQuestions = shuffleArray(data.objectQuiz);
        const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_LIMIT);
        setQuestions(selectedQuestions);
      })
      .catch(error => console.error('Error loading quiz data:', error));
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
        if (user?.email) {
          submitScore('object-quiz', score, user.email);
        }
      }
    }, 500);
  };

  const handleRestartQuiz = () => {
    // Reshuffle questions when restarting
    const shuffledQuestions = shuffleArray(allQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_LIMIT);
    setQuestions(selectedQuestions);
    
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setScore(0);
  };

  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="quiz-background">
      <div className="container text-center mt-4">
        <h3 className="fw-bold text-white">Object and Color Identification Quiz</h3>

        {/* Progress Bar */}
        <div className="progress mb-4" style={{ height: '30px' }}>
          <ProgressBar now={progressPercentage} animated className="w-100" style={{height: '30px', borderRadius: '30px'}}/>
        </div>

        {/* Quiz Card */}
        <div className="quiz-card">
          {quizCompleted ? (
            <div>
              <h3>Quiz Completed! 🎉</h3>
              <p>Your score: {score}/{questions.length}</p>
              <button className="btn btn-primary" onClick={handleRestartQuiz}>Restart Quiz</button>
            </div>
          ) : (
            questions.length > 0 && (
              <>
                <h3>{questions[currentQuestionIndex].question}</h3>
                <div className="row mt-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="col-6 p-2">
                      <button 
                        className={`quiz-option ${selectedOption === option ? 'selected' : ''}`} 
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectQuiz;
