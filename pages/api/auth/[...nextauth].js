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

                const isPasswordValid = await user.matchPassword(password);
                if (!isPasswordValid) {
                    throw new Error("Incorrect Password!");
                }

                return {email: user.email};

            }
        })
    ]
})