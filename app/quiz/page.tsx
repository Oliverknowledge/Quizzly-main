"use client"
import React, { useState } from "react";
import { questions } from "@/assets/predefinedtest";
import { QuestionCard } from "../../components/QuestionCard";
import Summary from "../../components/Summary";
import ProgressBar from "@/components/ProgressBar";


const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    questions.reduce((acc, question) => {
      acc[question.id] = ""; // Initialize all answers as empty
      return acc;
    }, {} as Record<string, string>)
  );
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const progress = ((currentQuestionIndex ) / questions.length) * 100; // Calculate progress via dividing the id of the question by the length of the array of questions
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = (userAnswer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: userAnswer,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowSummary(true);
    }
  };
  const handlePrevious = () => {
    if ( currentQuestionIndex > 0){
      setCurrentQuestionIndex((prev) => (prev -1))
    }
  }
  const handleTimeUp = () => {
    // Mark all remaining questions as "wrong"
    setAnswers((prev) =>
      questions.reduce((acc, question) => {
        acc[question.id] = prev[question.id] || "wrong";
        return acc;
      }, {} as Record<string, string>)
    );

    // Show the summary
    setShowSummary(true);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      {!showSummary ? (
        <>        <QuestionCard
          question={currentQuestion}
          onSubmit={handleAnswerSubmit}
          onPrevious = {handlePrevious}
          isFirst  = {currentQuestionIndex === 0}
          onTimeUp={handleTimeUp} // Pass time-up handler
          CurrentAnswer={answers[currentQuestion.id]} // Pass current answer
        />
       
          <ProgressBar progress = {progress} />
        
        </>

      ) : (
        <Summary  answers={answers} />
      )}
      
    </div>
  );
};

export default App;
