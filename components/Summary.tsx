// Summary.tsx
// Summary.tsx
import React from "react";
import { questions } from "@/assets/predefinedtest"; // Assuming your questions are here
import { Button } from "./ui/button"; // Assuming you have a Button component
import { fetchUser } from "@/actions/user.actions";

interface SummaryProps {
  answers: Record<string, string>;
}

const Summary: React.FC<SummaryProps> = ({ answers }) => {
  const handleSubmit = () => {
    
  }
  const totalQuestions = questions.length;
  const correctAnswers = questions.filter(
    (question) => answers[question.id] === question.answer
  ).length;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div className="w-[80vw] max-w-[600px] mx-auto flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4">Quiz Summary</h1>
      <p className="text-xl mb-6">Great job! here&apos;s how you did:</p>

      {/* Score Overview */}
      <div className="mb-6">
        <p className="text-2xl font-semibold">
          {correctAnswers} / {totalQuestions} Correct
        </p>
        <p className="text-xl">
          Score: {scorePercentage.toFixed(2)}%
        </p>
      </div>

      {/* Answer Breakdown */}
      <div className="w-full mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Answers:</h2>
        <div className="space-y-4">
          {questions.map((question) => {
            const isCorrect = answers[question.id] === question.answer;
            return (
              <div
                key={question.id}
                className={`p-4 border rounded-lg ${
                  isCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="font-semibold">{question.text}</p>
                <p>Your answer: {answers[question.id]}</p>
                {!isCorrect && (
                  <div className="text-red-500 mt-2">
                    <p>Correct answer: {question.answer}</p>
                    {/* Optionally, you can add explanations */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-6 flex justify-between">
        <Button onClick={() => window.location.reload()} className="w-[45%]">
          Retake Test
        </Button>
        <Button
          onClick={() => handleSubmit()} // Redirect to the home/dashboard
          className="w-[45%] bg-blue-500 text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Summary;
