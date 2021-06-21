import {useState} from 'react';
import classes from "./auth-form.module.css";
import {createUser, loginUser} from "../../helpers/auth";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log("user is logged in")
            try {
                const response = await loginUser(email, password);
                console.log(response);
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const response = await createUser(email, password);
                console.log(response)
            } catch (err) {
                console.log(err)
            }

        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' id='email' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type='password' id='password' required />
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
        </section>

    );
};

export default AuthForm;
