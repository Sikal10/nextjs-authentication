import User from "../../../models/userModel";
import connectDB from "../../../db/connectDB";

connectDB();

const validateCredentials = (email, password) => {
    if (!email || !password) {
        throw new Error("Please provide an email and a password")
    }
}

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return;
    }
    const {email, password} = req.body;

    validateCredentials(email, password);

    const user = await User.findOne({email});

    const isPasswordValid = await user.matchPassword(password);

    if (user && isPasswordValid) {
        res.json({
            msg: "success"
        })
    } else {
        res.status(401).json("Invalid credentials");
        throw new Error("Invalid email or password");
    }
}

export default handler;