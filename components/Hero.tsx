import React from 'react'

import { HeroHighlightDemo } from './Highlight'


const Hero = () => {
  return (
    <div className = "flex justify-center items-center w-screen h-[30rem] mx-auto">
        <div className = "w-screen justify">
            <div className = "">
         
                <HeroHighlightDemo/>
          
            </div>
            <div className = "w-screen h-[10%] flex items-center justify-center">
              <div className = "w-[50%] text-center">
            <h3 className = "text-xl">Master tough subjects, ace your exams, and study like never <br></br> before
               — using the ultimate AI-powered study tool.</h3>
        </div>
        </div>
        </div>


    </div>
  )
}

export default Hero