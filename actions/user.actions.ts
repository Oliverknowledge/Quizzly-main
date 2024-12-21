"use server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/models/user.models";
import { userTypes } from '@/types/Usertypes'
import bcrypt from 'bcryptjs';


export const createUser = async({name, email, password, profile_picture}: userTypes) => {
    try{
        connectToDB(); // Connect to database
        const existingUser= await User.findOne({ email });
        
      

        if (existingUser) {
            return false;
        }
        password = await bcrypt.hash(password, 10);
    
        const user = await new User({name, email, password,  profile_picture});
        user.save()
        
        return true;
    }
    catch(error: any){
        console.log(error.message)
    }
}


