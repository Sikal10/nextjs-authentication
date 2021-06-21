import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectDB from "../../../db/connectDB";
import User from "../../../models/userModel";

connectDB();

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const {email, password} = credentials;
                const user = await User.findOne({email});
                if (!user) throw new Error("No user found!");

                const isPasswordValid = user.matchPassword(password);
                if (!isPasswordValid) {
                    throw new Error("Could not log you in.")
                }

                return {email: user.email}

            }
        })
    ]
})