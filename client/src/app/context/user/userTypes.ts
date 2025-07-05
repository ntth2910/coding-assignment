import { User } from "@acme/shared-models";

export type UserState = {
  users: User[];
};

export type UserAction =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: number };
