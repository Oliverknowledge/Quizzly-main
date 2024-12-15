import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import User from '@/models/user.models'
import connectToDatabase from '@/lib/mongodb';


export async function POST(request: Request) {
    const { name, email, password, profile_picture} = await request.json();

    
    try {
        console.log(request)
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exist" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            profile_picture,
        });
        await newUser.save();
        return NextResponse.json({ message: "User created" }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}