import connectDB from "../../../db/connectDB";
import User from "../../../models/userModel";

connectDB();

const handler = async (req, res) => {
    if (req.method === "POST") {
        const {name, email, password} = req.body;

        //check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error(`User with email ${email} already exists.`)
        }

        //create a user
        const user = await User.create({name, email, password});

        if (user) {
            return res.json({
                success: true,
                data: user,
                message: "user created successfully"
            })
        }
    }
}

export default handler;