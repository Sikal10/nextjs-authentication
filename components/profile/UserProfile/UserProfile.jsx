import ProfileForm from "../ProfileForm/ProfileForm";
import classes from "./user-profile.module.css";
import axios from "axios";

const UserProfile = () => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const changePasswordHandler = async ({oldPassword, newPassword}) => {
        const {data} = await axios.put("/api/user/change-password", {oldPassword, newPassword}, config);
        console.log(data)
    }

    return (
        <section className={classes.profile}>
            <h1>Your Profile</h1>
            <ProfileForm onChangePassword={changePasswordHandler} />
        </section>
    );
};

export default UserProfile;