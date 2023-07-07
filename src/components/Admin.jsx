import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin(adminProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${adminProps.URL}/admin-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        }); 

        const userAdmin = await response.json();
        console.log(userAdmin);

        if (userAdmin.success === "user-database") {
            // redirect to admin page
            navigate("/admin-login/user-database");
            adminProps.setIsAdmin(true);
        } else {
            console.log(userAdmin.message);
            navigate("/admin-login");
            adminProps.setIsAdmin(false);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Admin Login</h1>
                    <input
                        type="text"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="username"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}
