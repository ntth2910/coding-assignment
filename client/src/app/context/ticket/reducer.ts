import { State, Action } from "./types";

export const initialState: State = { tickets: [], users: [] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TICKETS":
      return { ...state, tickets: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "ADD_TICKET":
      if (state.tickets.find((t) => t.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
};
