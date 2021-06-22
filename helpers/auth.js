import axios from "axios";

export const createUser = async (name, email, password) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const {data} = await axios.post("/api/auth/signup", {name, email, password}, config);

    if (!data.success) {
        throw new Error("Something went wrong!!")
    }
    console.log(data);
    return data;
}
