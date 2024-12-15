"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Image from 'next/image'






const Navbar = () => {
    
    const router = useRouter()
  return (
    <nav className ="  w-screen h-[5rem] z-10 flex justify-center items-center flex-col bg-white  border-gray-100 border-b">
        <div className = "w-[80%] flex justify-between ">
            <div className = "flex flex-row gap-10 ">

                <Link href = "/" className = "flex flex-row">
                    <Image src="/logo.jpeg" alt="logo" width ={40} height={40} className  = "rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm " />
                    <h1 className = "font-semibold tracking-tight text-xl   ">
                        Quizzly
                    </h1>
                </Link>
            
                
            </div> 
        <div className = "flex flex-row gap-2">
            <Button onClick = {() => router.push("/sign-in")} variant = {"outline"} size = "sm" className = "active:bg-gray-400     shadow-[inset_0_0_0_1px_#616467] text-black px-4 rounded-2xl  hover:-translate-y-1 transform   transition duration-200">
                Sign in
            </Button>
            <Button onClick = {() => router.push("get-started")} variant={"default"} size = {"sm"}  className = "active:bg-gray-950 text-md text-white  hover:-translate-y-1 transform transition duration-200 rounded-xl">
                <span className = "font-normal">Get started</span> 
            </Button>
        </div> 
        </div>
        
    </nav>
  )
}

export default Navbar