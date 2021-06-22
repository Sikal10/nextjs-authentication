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

    const router = useRouter();

    const switchAuthModeHandler = async () => {
        if (isLogin) {
            await router.push("/auth/signup")
        }
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (!result.error) {
                await router.replace("/profile")
            }
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
                    <button>Login</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin && 'Create new account'}
                    </button>
                </div>
            </form>

        </section>

    );
};

export default AuthForm;
