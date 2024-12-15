"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { validateUser } from "@/actions/user.actions"
import { loginValidation } from "@/validation/user"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Highlight } from "@/components/NegativeCards"


 


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [error, setError ] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof loginValidation>){
    try{
      setLoading(true)
      setError(false)
      const successful = await validateUser(values.email, values.password)
      if (successful) router.push("/dashboard")
      else{
        setError(true)
    }
    }
    catch(error: any){
      console.log(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className = "w-[100vw] h-[100vh] flex flex-col gap-10 items-center justify-center">
      <h1 className = "text-4xl ">👋Welcome back</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name = "email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@swichly.com" {...field} className = "rounded-xl font-semibold hover:bg-[#e7e7e7] pl-4 focus:bg-white  bg-[#f0f0f0] text-[#222222] tracking-wide w-[25rem] h-[3rem]"  />
              </FormControl>
              <FormDescription>
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
                <Button type = "button" variant="link" className="absolute translate-x-[20rem] translate-y-[3.25rem] " onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Password"
                          className={`   
                            ${!showPassword ? "text-2xl  pb-2 items-center placeholder:text-sm placeholder:tracking-wide placeholder:-translate-y-[0.25rem]" : "placeholder:text-sm placeholder:tracking-normal "}                       
                            rounded-xl 
                            font-semibold 
                            pl-4 
                            mt-4 
                            bg-[#f0f0f0] 
                            focus:bg-white 
                            hover:bg-[#e7e7e7] 
                            text-[#222222] 
                            w-[25rem] 
                            h-[3rem] 
                            
                            
                          
                            `}
                          {...field}
                 
                        />
              </FormControl>
              <FormDescription>
                Your password, keep it safe
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        {error ? (
          <>
            <h2 className = "text-red-500 text-xl"><Highlight positive = {false}>Incorrect email or password</Highlight></h2>
          </>
        ): (
          <></>
        )}
         {!loading ? (
        <Button type="submit">Sign in</Button>)
        : (
          <Button
          className=" font-semibold text-white text-lg   "
          disabled
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-gray-400 rounded-full h-4 w-4 animate-pulse" />
          ))}
        </Button>
        )
}   
      </form>
    </Form>

   
    </div>
  )
}
