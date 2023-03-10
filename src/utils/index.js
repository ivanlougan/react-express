import {writeCookie, getTokenFromCookie} from "../common"

export const addUser = async (username, email, password) => {
    try {
        const response = await fetch("http://localhost/users/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        console.log ("data: ", data);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (username, password, setUser) => {
    try {
        const response = await fetch("http://localhost/users/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        console.log(data.user.token);

        setUser(data.user);
        writeCookie("jwt_token", data.user.token, 7)
     } catch (error) {
                console.log (error);
        }
    };

    export const getAllUsers = async () => {
        try {

            const token = getTokenFromCookie("jwt_token");

            const response = await fetch("http://localhost/users/getallusers", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();
            return data.users;

        } catch (error) {
            console.log(error);
        }
    }

    export const authCheck = async (jwtToken) => {
        try {
            
            const response = await fetch("http://localhost/users/authcheck", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            const data = await response.json();
            data.user.token = jwtToken;

            return data;

        } catch (error) {
            console.log(error);
        }
    };