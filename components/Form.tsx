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
import { UserValidation } from "@/validation/user"
import FileUploader from "./FileUploader"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { signIn } from "next-auth/react"


export default function SignupForm() {
  const [ loading, setLoading ] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);
  const router = useRouter()
  const [error, setError] = useState(false)
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: [],
      name: "",
      password: "",
      email: "",
     
    },
  })
  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/dashboard" });
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    try{
      setLoading(true);
      
      const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string); // Resolve with Base64 string
          reader.onerror = (error) => reject(error); // Reject on error
        });
      };
      let profile_url: string = "/DefaultAvatar.jpeg";
      if (values.profile_photo?.[0]) {
        profile_url = await convertFileToBase64(values.profile_photo[0]);
      }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: values.name, email: values.email, password: values.password, profile_picture:  profile_url}),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/sign-in");
    } else if (res.status === 400) {
      setError(data.message);
      
    } else if (res.status === 500) {
      setError(data.message);
      
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
    
    <Form {...form}>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {error ? (
        <h3 className = "text-red-500 ">User already exists</h3>
      )
    : (<h3></h3>)
}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Oliver Stevenson" {...field} className = "rounded-xl font-semibold hover:bg-[#e7e7e7] pl-4 focus:bg-white  bg-[#f0f0f0] text-[#222222] tracking-wide w-[30rem] h-[3rem]"/>
              </FormControl>
              <FormDescription>
                This is your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@quizzly.com" {...field} className = "rounded-xl font-semibold hover:bg-[#e7e7e7] pl-4 focus:bg-white  bg-[#f0f0f0] text-[#222222] tracking-wide w-[30rem] h-[3rem]"/>
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
        <div className = " absolute flex translate-x-[28vw] -translate-y-[15vh] "> 
       
         <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
            <FormLabel >
              <h1 className = "text-center">Profile photo</h1></FormLabel>
            <FormControl>

                    <FileUploader files={field.value} onChange={field.onChange} />
              
                </FormControl>
              </FormItem>
          )}
        />
        </div>
        <div className = "flex flex-row">
        {!loading ? (
        <Button type="submit">Get started</Button>)
        : (
          <Button
          className=" font-semibold text-white text-lg   "
          disabled
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-gray-400 rounded-full h-2 w-2 mx-0.5 animate-pulse" />
          ))}
        </Button>
        )
        
}  
<Button variant ={"link"}  type = "button" className = "text-blue-500" onClick = {() => router.push("/sign-in")}>
          Already have an account?
          </Button>

           </div>
      <div className = "">
      <Button type = "button" className = "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-black w-[7.5rem] mr-2"  onClick={(e) => handleProvider(e, "github")}>
      <IconBrandGithub className="h-4 w-4 text-black" />Github</Button>
      <Button type = "button" className = "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-black w-[7.5rem]" onClick={(e) => handleProvider(e, "google") }>
      <IconBrandGoogle className="h-4 w-4 text-black" />Google</Button>
      </div>
      </form>
    </Form>
  )
}
