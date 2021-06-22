import {getSession} from "next-auth/client";
import connectDB from "../../../db/connectDB";
import User from "../../../models/userModel";

connectDB();

const handler = async (req, res) => {
    if (req.method !== "PUT") {
        return;
    }

    const session = await getSession({req});
    if (!session) {
        res.status(401).json({message: "Not authenticated!"});
        return;
    }

    const userEmail = session.user.email;
    const user = await User.findOne({email: userEmail});
    console.log(user)
    if (!user) {
        res.status(404).json({message: "User not found"});
        return;
    }

    //check current password
    const passwordsAreEqual = await user.matchPassword(req.body.oldPassword)
    if (!passwordsAreEqual) {
        res.status(403).json({message: "Password is incorrect"})
        return;
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({success: true, msg: "Password was successfully changed!"})
}

export default handler;