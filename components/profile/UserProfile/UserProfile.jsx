import ProfileForm from "../ProfileForm/ProfileForm";
import classes from "./user-profile.module.css";


const UserProfile = () => {
    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm />
        </section>
    );
};

export default UserProfile;