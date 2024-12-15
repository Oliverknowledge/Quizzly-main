"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import { Highlight } from './NegativeCards'
import {motion, useInView} from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};  
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 5, // Slide-up effect
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

const   HowSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
    variants = {containerVariants} 
    initial="hidden"
    animate="visible"
    ref = {ref}
     className = "w-screen h-[60rem] flex mt-10 pt-10 text-white items-center bg-black flex-col gap-4">
        <div className  = " w-[72%] flex flex-col gap-5  items-center">
          <h2 className = "text-5xl ">Why quizzly?</h2>
        <h3 className = "text-md text-gray-400 text-center "> With {" "}
            <span className = "italic text-red-500">grade boundaries</span> climbing every year,
           achieving {" "}
        <span className = "italic text-green-500">8s and 9s</span><br></br> has never been more challenging.</h3>
        </div>
      
        <h1 className = "text-3xl mt-10">This tool saves <Highlight>time, stress and effort</Highlight></h1>
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
         className = "flex flex-row gap-10 w-[80%] justify-center mt-16">
          <div className = "bg-red-900/20 border-2 border-red-500 w-[40%] h-[20rem] flex flex-col pl-4 rounded-2xl">
            <div className = "flex flex-row w-[90%] justify-between mt-2">
            <h1 className = "font-semibold text-2xl mb-2 mt-1 text-red-600">
              Studying without Quizzly
            </h1>
            <Image src = "/cross.svg" alt = "cross" width = {40} height = {40} className = "" />
            </div>
            <ul className = "gap-2 text-lg text-[#bbb] mt-2 leading-10  list-disc list-inside">
              <li>
            Hours spent on online videos...
            </li>
            <li>
              Forgetting methods...
            </li>
            <li>
              Struggling with the time pressure of exams...
            </li>
            <li>
              Overall boredom...
            </li>
          </ul>
          </div>
          <div className = "bg-green-900/20 border-2 border-green-500 w-[40%] h-[20rem] flex flex-col pl-4 rounded-2xl">
            <div className = "flex flex-row w-[90%] justify-between mt-2">
            <h1 className = "font-semibold text-2xl mb-2 mt-1 text-green-600">
              Studying with Quizzly
            </h1>
            <Image src = "/tick.svg" alt = "cross" width = {40} height = {40} className = "" />
            </div>
            <ul className=  "gap-2 text-lg text-[#bbb] mt-2 leading-10  list-disc list-inside">
            <li>
              Adaptive mock exams
            </li>
            <li>
              Real-time feedback
            </li>
            <li>
              Progress tracking
            </li>
            <li>
              Engaging platform
            </li>
          </ul>
          </div>
        </motion.div>
      

        
    </motion.div>
  )
}

export default HowSection