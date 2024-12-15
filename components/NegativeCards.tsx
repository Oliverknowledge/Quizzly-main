"use client";

import { cn } from "@/lib/utils";


// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
  positive
}: {
  children: React.ReactNode;
  className?: string;
  positive?: boolean;
}) => {
  return (
    <>
    {positive ? (
      <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>) 
    : (
      <span className = "font-bold bg-red-100 text-red-600 dark:bg-red-700/[0.2] dark:text-red-500 px-1 py-0.5">
      {children}
      </span>
    )
    }</>
  );
};

