import {
    assignTicket,
    unassignTicket,
    completeTicket,
    uncompleteTicket,
  } from '../context/api';
  
  jest.mock('../context/api', () => ({
    assignTicket: jest.fn(),
    unassignTicket: jest.fn(),
    completeTicket: jest.fn(),
    uncompleteTicket: jest.fn(),
  }));
  
  const dispatch = jest.fn();
  
  const ticket = { id: 1, completed: false, assigneeId: null };
  
  test('assignTicket calls API and dispatches update', async () => {
    (assignTicket as jest.Mock).mockResolvedValueOnce(undefined);
  
    const userId = 2;
  
    await assignTicket(ticket.id, userId);
  
    expect(assignTicket).toHaveBeenCalledWith(1, 2);
  });
  
  test('unassignTicket calls API and dispatches update', async () => {
    (unassignTicket as jest.Mock).mockResolvedValueOnce(undefined);
  
    await unassignTicket(ticket.id);
  
    expect(unassignTicket).toHaveBeenCalledWith(1);
  });
  
  test('completeTicket toggles correctly', async () => {
    (completeTicket as jest.Mock).mockResolvedValueOnce(undefined);
  
    await completeTicket(ticket.id);
  
    expect(completeTicket).toHaveBeenCalledWith(1);
  });
  
  test('uncompleteTicket toggles correctly', async () => {
    const completedTicket = { ...ticket, completed: true };
    (uncompleteTicket as jest.Mock).mockResolvedValueOnce(undefined);
  
    await uncompleteTicket(completedTicket.id);
  
    expect(uncompleteTicket).toHaveBeenCalledWith(1);
  });
  