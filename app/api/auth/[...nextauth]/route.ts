import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user.models';
const prisma = new PrismaClient()
export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    console.log(credentials)
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email });
                    console.log(user)
                    if (!user) {
                        return null;
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                   

                    if (!isValidPassword) {
                        return null;
                    }
                    return user;
                }
                catch {
                    return null;
                }
            }
        })
        
    ],
    callbacks: {
        async session({session, token, user}: {session: string, token: string, user: string}){
            console.log("session callback", {session, token, user})
            return session;
        },
        async jwt({session, token, user}: {session: string, token:string, user:string}){
            console.log("jwt callback", {session, token, user})
            return token
        }
        

    },
    adapter: PrismaAdapter(prisma),
    
   
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};