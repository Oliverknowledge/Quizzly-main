"use client"
import  SignupForm  from '@/components/Form'
import { Highlight } from '@/components/ui/hero-hightlight'

import React from 'react'

const SignUp = () => {
  
  return (
    <div className = "w-screen h-screen flex justify-center ">

        <div className = "h-fit w-[40%] border px-2 py-4 border-gray-200 mt-10 rounded-2xl bg-white">
            <h1 className = "text-2xl text-center">Welcome to <Highlight>Quizzly!</Highlight></h1>
            <SignupForm/>
        </div>

    </div>
  )
}

export default SignUp