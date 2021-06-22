import {useState} from 'react';
import classes from "./auth-form.module.css";
import {createUser} from "../../helpers/auth";
import {signIn} from "next-auth/client";
import {useRouter} from "next/router";
import Notification from "../../ui/notification/Notification";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [requestError, setRequestError] = useState("");

    const router = useRouter();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        setRequestStatus("pending")

        if (isLogin) {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (!result.error) {
                await router.replace("/profile")
            }
            console.log(result);
        } else {
            try {
                const response = await createUser(email, password);
                console.log(response);
                setRequestStatus("success");
                setRequestMessage(response.message);
                setEmail("");
                setPassword("");

            } catch (err) {
                console.log(err);
                setRequestStatus("error");
                setRequestError(err.message);
            }
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
            message: requestError
        }
    }



    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' id='email' required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' id='password'
                           required/>
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>

            {notification && <Notification status={notification.status} message={notification.message} />}
        </section>

    );
};

export default AuthForm;
