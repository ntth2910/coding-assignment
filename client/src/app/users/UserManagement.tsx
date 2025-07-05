import React, { useState } from "react";
import { useTicketContext } from "../context/ticket/TicketContext";
import styles from "./userManagement.module.css";
import { useUserContext } from "../context/user/UserContext";

const UserManagement = () => {
  const { state, dispatch } = useUserContext();
  const [newName, setNewName] = useState("");

  const handleAddUser = async () => {
    if (!newName.trim()) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      const newUser = await res.json();
      dispatch({ type: "ADD_USER", payload: newUser });
      setNewName("");
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      dispatch({ type: "DELETE_USER", payload: id });
    }
  };

  return (
    <div className={styles["container"]}>
      <h2>User Management</h2>

      <div className={styles["addForm"]}>
        <input
          type="text"
          placeholder="New user name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table className={styles["table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
