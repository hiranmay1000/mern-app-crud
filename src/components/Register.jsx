import React from "react";
import { useState } from "react";

// import femaleAvatar from "../images/female-avatar.webp";
// import maleAvatar from "../images/male-avatar.webp";

export default function Register(regProps) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [message, setMessage] = useState("");

    const showNotiMessage = document.getElementById("show-noti-message");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", image);

        const response = await fetch(`${regProps.URL}/register`, {
            method: "POST",
            body: formData,
        });

        const regUser = await response.json();
        if (regUser.success) {
            setMessage(regUser.message);
        } else {
            setMessage(regUser.message);
        }
        setTimeout(() => {
            showNotiMessage.style.right = "-100%";
        }, 5000);
        showNotiMessage.style.right = "0%";
    };
    return (
        <div>
            <div id="show-noti-message" className="show-noti-message">
                <p>{message}</p>
            </div>
            <form
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
                className="register-form"
            >
                <h2>Register </h2>
                <input
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    placeholder="username"
                    required
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
                <div className="show-image-to-client">
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: "200px" }}
                        />
                    )}
                </div>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}
