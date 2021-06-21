import UserProfile from "../../components/profile/UserProfile/UserProfile";
import {getSession} from "next-auth/client";

const ProfilePage = () => {
    return (
        <UserProfile />
    );
};


export default ProfilePage;