import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

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
            await connectToDB();

            const user = await User.findOne({email: profile.email});

            if (!user) {
                await User.create({
                    email: profile.email,
                    name: profile.name,
                    image: profile.image,
                });
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
});

export {handler as GET, handler as POST};