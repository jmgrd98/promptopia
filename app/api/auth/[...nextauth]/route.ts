import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({session}: any) {
        
    },
    async signIn({profile}: any) {
        try {
            
        } catch (error) {
            
        }
    }
});

export {handler as GET, handler as POST};