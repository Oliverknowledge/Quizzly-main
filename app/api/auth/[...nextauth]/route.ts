import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';


export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
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
        

    }
    
   
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};