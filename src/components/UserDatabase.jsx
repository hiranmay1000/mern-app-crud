import { React, useEffect, useState } from "react";

import editIcon from "../images/edit-icon.png";
import deleteIcon from "../images/delete-icon.png";

import "../styles/user-database.css";

export default function UserDatabase(udbProps) {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const [userID, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    const [hiddenEditForm, setHiddenEditForm] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${udbProps.URL}/edit-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userID,
                    name: name,
                    username: username,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log(data.message);
                getUsers();
            } else {
                console.log(data.message);
            }

            // Hide Edit-form
            editForm.style.top = "-100%";
        } catch (error) {}
    };

    const editForm = document.getElementById("edit-form");

    const handleEditData = (_id, userName) => {
        if (hiddenEditForm === false) {
            editForm.style.top = "-15%";
            editForm.style.opacity = "0.5";
            setTimeout(() => {
                editForm.style.top = "0%";
                editForm.style.opacity = "1";
            }, 250);
        } else {
            editForm.style.top = "0%";
        }

        setUserId(_id);
        setUserName(userName);

        setHiddenEditForm(false);
    };

    const handleCanelEdit = () => {
        editForm.style.top = "-100%";
        setHiddenEditForm(true);
    };

    const handleDeleteUserData = async (_id) => {
        const deleteAlert = window.confirm("Are you sure?");
        try {
            if (deleteAlert) {
                const response = await fetch(
                    `${udbProps.URL}/delete-user/${_id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (response.ok) {
                    console.log("response ok");
                    getUsers();
                } else {
                    console.log("response NOT ok");
                }

                const data = await response.json();
                console.log(data.message);
            } else {
                console.log("user not deleted");
            }
        } catch (error) {
            console.log("An error occured: ", error);
        }
    };

    const getUsers = async () => {
        const response = await fetch(`${udbProps.URL}/user-database`, {
            method: "GET",
        });

        const val = await response.json();
        setUsers(val);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        getUsers();
    });

    return (
        <div>
            <h2>USER DATABASE</h2>
            <table className="table-container">
                <thead>
                    <tr className="table-row-heading">
                        <th>Profile Pic</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        className="profile-pic"
                                    />
                                ) : (
                                    <img
                                        src={"../images/male-avatar.webp"}
                                        alt="Profile"
                                        className="profile-pic"
                                    />
                                )}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleEditData(user._id, user.name)
                                    }
                                    className="edit-btn"
                                    type="button"
                                >
                                    <img src={editIcon} alt="operation-icon" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteUserData(user._id)
                                    }
                                    type="button"
                                >
                                    <img
                                        src={deleteIcon}
                                        alt="operation-icon"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="register-form edit-form-animation"
                id="edit-form"
            >
                <div
                    onClick={handleCanelEdit}
                    className="cancel-edit"
                    id="cancel-edit"
                >
                    X
                </div>
                <h2 style={{ margin: "15px 0 0 0" }}>Edit User </h2>
                <p style={{ margin: "0 0 25px 0" }}>{userName} </p>
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
                    value={users.username}
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
                <button type="submit">Save changes</button>
            </form>
        </div>
    );
}
