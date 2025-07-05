import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { State, Action } from './types';
import { reducer, initialState } from './reducer';
import { fetchTickets, fetchUsers } from './api';

interface TicketContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchTickets().then(data => dispatch({ type: 'SET_TICKETS', payload: data }));
    fetchUsers().then(data => dispatch({ type: 'SET_USERS', payload: data }));
  }, []);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error('useTicketContext must be used within a TicketProvider');
  return context;
};
