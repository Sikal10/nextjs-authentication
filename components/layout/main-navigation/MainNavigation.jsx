import Link from "next/link";
import classes from "./main-navigation.module.css";
import {useSession} from "next-auth/client";
import {signOut} from "next-auth/client";

const MainNavigation = () => {
    const [session, loading] = useSession();

    const logoutHandler = async () => {
        await signOut();
    }

    return (
        <header className={classes.header}>
            <Link href='/'>
                <a>
                    <div className={classes.logo}>Sikal</div>
                </a>
            </Link>
            <nav>
                <ul>
                    {!session && !loading && <li><Link href='/auth'>Login</Link></li> }
                    {session && <li><Link href='/profile'>Profile</Link></li> }
                    {session && <li><button onClick={logoutHandler}>Logout</button></li> }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;