// ProgressBar.tsx
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress}) => {
  return (
    <div className="w-[80vw] h-2 bg-gray-200 rounded-lg overflow-hidden bottom-10 absolute">
      <motion.div
        className="h-full bg-green-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
