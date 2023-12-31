import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: String(process.env.GOOGLE_CLIENT_ID),
            clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        }),
    ],
    callbacks: {
        async session({session, user}: any) {
            const sessionUser = await User.findOne({email: session.user.email});
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}: any) {
            try {
                await connectToDB();
    
                const userExists = await User.findOne({email: profile.email});
    
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
    
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    },
});

export {handler as GET, handler as POST};