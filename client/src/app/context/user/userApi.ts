import { User } from "@acme/shared-models";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
};
