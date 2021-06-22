import React, {useState} from 'react'
import classes from "./signup.module.css";
import {createUser} from "../../../helpers/auth";
import {useRouter} from "next/router";
import Notification from "../../../ui/notification/Notification";

const SignupForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [requestMessage, setRequestMessage] = useState("");

    const router = useRouter();

    const signupHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            const error = new Error("Passwords do not match");
            error.code = 400
            throw error;
        }

        setRequestStatus("pending")
        try {
            const user = await createUser(name, email, password);
            setRequestStatus("success");
            setRequestMessage(user.message);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            await router.push("/auth");

        } catch (err) {
            setRequestStatus("error");
            setRequestMessage(err.message)
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending"
        }
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            message: requestMessage
        }
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            message: requestMessage
        }
    }

    return (
        <section className={classes.signup}>
            <h1>Sign Up</h1>
            <form onSubmit={signupHandler}>
                <div className={classes.control}>
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" required/>
                </div>

                <button className={classes.button}>Register</button>
            </form>

            {notification && <Notification status={notification.status} message={notification.message} />}
        </section>
    );
};

export default SignupForm;