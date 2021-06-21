import axios from "axios";

export const createUser = async (email, password) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const {data} = await axios.post("/api/auth/signup", {email, password}, config);

    if (!data.success) {
        throw new Error("Something went wrong!!")
    }
    console.log(data);

    return data;
}

export const loginUser = async (email, password) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const {data} = await axios.post("/api/auth/signin", {email, password}, config);

    if (!data.success) {
        throw new Error("Something went wrong!!!")
    }
    console.log(data);
    return data;
}
