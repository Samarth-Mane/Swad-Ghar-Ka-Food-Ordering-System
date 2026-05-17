// ========================================
// API BASE URL
// ========================================

const API_BASE_URL = "http://localhost:1818";

// ========================================
// REGISTER USER
// ========================================

async function registerUser(
    name,
    email,
    password,
    phone
) {

    try {

        const response = await fetch(

            "/api/auth/register",

            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    email: email,

                    password: password,

                    phone: phone
                })
            }
        );

        // GET TEXT RESPONSE
        const text =
            await response.text();

        // IF ERROR
        if (!response.ok) {

            return {

                success: false,

                message: text
            };
        }

        // SUCCESS
        return {

            success: true,

            message: text
        };

    } catch (error) {

        console.error(error);

        return {

            success: false,

            message:
                "Server error"
        };
    }
}

// ========================================
// LOGIN USER
// ========================================

async function loginUser(
    email,
    password
) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("LOGIN RESPONSE:", data);

        // SAVE TOKEN

        if(data.success){

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );
        }

        return data;

    } catch(error){

        console.error(
            "Login Error:",
            error
        );

        return {
            success: false,
            message: "Server error"
        };
    }
}

// ========================================
// GET USER PROFILE
// ========================================

async function getProfile() {

    const token =
        localStorage.getItem("token");

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/auth/profile`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );

        return await response.json();

    } catch(error){

        console.error(error);

        return null;
    }
}

// ========================================
// LOGOUT
// ========================================

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}