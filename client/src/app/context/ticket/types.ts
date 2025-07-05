import { Ticket, User } from "@acme/shared-models";

export interface State {
  tickets: Ticket[];
  users: User[];
}

export type Action =
  | { type: "SET_TICKETS"; payload: Ticket[] }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "UPDATE_TICKET"; payload: Ticket }
  | { type: "ADD_TICKET"; payload: Ticket }
  | { type: "DELETE_TICKET"; payload: number };
