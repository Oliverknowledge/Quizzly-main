"use client" ;
// QuestionCard.tsx
import React, { useEffect, useState } from "react";
import { questionTypes } from "@/types/Usertypes";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Highlight } from "./NegativeCards";
import { motion } from 'framer-motion';


interface QuestionCardProps {
  question: questionTypes;
  onSubmit: (userAnswer: string) => void;
  onTimeUp: () => void; // Callback for when the timer ends
  onPrevious: () => void;
  isFirst: boolean;
  CurrentAnswer: string;
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Stagger the children animations
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Slide-up effect
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSubmit, onTimeUp, onPrevious, isFirst, CurrentAnswer}) => {

  const [userAnswer, setUserAnswer] = useState(CurrentAnswer ?? "");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleSubmit = (answer: string) => {
    onSubmit(answer); // Submit the current answer to the parent
    setUserAnswer(""); // Clear input for the next question
  };

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // Clean up
  }, [timeLeft, isPaused]);

  // Notify the parent when the timer runs out
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft]);
   useEffect(() => {
    setUserAnswer(CurrentAnswer); // Update when the question changes
  }, [CurrentAnswer]);

  return (
    <motion.div variants={containerVariants}
    initial="hidden"
      animate="visible"
    >
    <motion.div variants = {itemVariants}
      initial = "hidden"
      animate= "visible"
      className="lg:w-[50vw] h-[80vh] border border-gray-200 items-center flex flex-col p-4 rounded-2xl">
      <div className="w-[50vw] pl-2">
        {question.calculator ? (
          <Highlight positive={true} className="mt-10">
            Calculator allowed
          </Highlight>
        ) : (
          <Highlight positive={false}>Calculator not allowed</Highlight>
        )}
        <h2 className="text-xl mt-10">Grade: {question.grade}</h2>
      </div>

      <div className="w-[50vw] flex justify-end mr-4 absolute   ">
        <div className = "flex flex-col ">
        <h2 className="text-blue-500 mb-2">Time left:</h2>
        <div className = "flex items-center">
        <h2 className={timeLeft <= 120 ? "text-red-400" : "text-black"}>
          ⌛ {minutes}:{formattedSeconds}
        </h2>
        <Button
          onClick={() => setIsPaused((prev) => !prev)}
          size="icon"
          className="bg-white hover:bg-gray-100 shadow-none active:bg-gray-300"
        >
          {!isPaused ? "⏸️" : "▶️"}
        </Button>
        </div>
        </div>
      </div>

      <h1 className="text-3xl absolute mt-10">{question.name}</h1>
      {question.image && <Image src={question.image} alt="Question visual" width = {600} height = {600} />}
      <div className = "w-[85%] text">
      <h2 className="mt-10 text-wrap">{question.text}</h2>
    </div>
      <div className="flex items-end h-full w-full mx-auto">
        
        <Input
          type="text"
          placeholder="Answer"
          
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isPaused}
        />

        <div className="flex w-full justify-end">
          <Button  onClick={onPrevious}
          size = "lg"
          disabled={isFirst} // Disable if it's the first question
          className={`${isFirst ? "opacity-50" : ""} bg-blue-500`}>
            Previous
          </Button>
          <Button
            onClick={() => handleSubmit(userAnswer)}
            className="px-10 mx-2 "
            size = "lg"
            disabled={isPaused}
          >
            Next
          </Button>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
