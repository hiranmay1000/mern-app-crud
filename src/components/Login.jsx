import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(loginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const showNotiMessage = document.getElementById("show-noti-message");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${loginProps.URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const user = await response.json();

        if (user.success) {
            loginProps.setIsValidUser(user.success);
            navigate("/dashboard");
        } else {
            loginProps.setIsValidUser(false);
            setMessage(user.message);
            navigate("/login");
        }

        setTimeout(() => {
            showNotiMessage.style.right = "-100%";
        }, 5000);
        showNotiMessage.style.right = "0%";
    };

    return (
        <div>
            <div className="login-page">
                <div id="show-noti-message" className="show-noti-message">
                    <p>{message}</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>User Login</h1>
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
