import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import User from '@/models/user.models'
import connectToDatabase from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';


export async function POST(request: Request) {
    const { name, email, password, profile_picture} = await request.json();

    
    try {
       
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exist" }, { status: 400 });
        }
     
        
        const uploadResponse = await cloudinary.uploader.upload(profile_picture, {

        });
        if (!uploadResponse){
            console.log("Error");
            return null;
        }
            

         
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            profile_picture: uploadResponse.secure_url,
        });
        await newUser.save();
        return NextResponse.json({ message: "User created" }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}