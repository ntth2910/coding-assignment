import { Ticket, User } from "@acme/shared-models";

// GET: All tickets
export const fetchTickets = async (): Promise<Ticket[]> => {
  const res = await fetch("/api/tickets");
  return res.json();
};

// GET: All users
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");
  return res.json();
};

// POST: Create new ticket
export const createTicket = async (
  ticket: Omit<Ticket, "id">
): Promise<Ticket> => {
  const res = await fetch("/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json();
};

// DELETE: Delete ticket
export const deleteTicket = async (id: number): Promise<void> => {
  const res = await fetch(`/api/tickets/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete ticket");
};

// PUT: Assign user to ticket
export const assignTicket = async (
  ticketId: number,
  userId: number
): Promise<void> => {
  const res = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to assign ticket");
};

// PUT: Unassign user from ticket
export const unassignTicket = async (ticketId: number): Promise<void> => {
  const res = await fetch(`/api/tickets/${ticketId}/unassign`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to unassign ticket");
};

// PUT: Mark ticket as complete
export const completeTicket = async (id: number): Promise<void> => {
  const res = await fetch(`/api/tickets/${id}/complete`, {
    method: "PUT",
  });

  if (!res.ok) throw new Error("Failed to complete ticket");
};

// DELETE: Mark ticket as incomplete
export const uncompleteTicket = async (id: number): Promise<void> => {
  const res = await fetch(`/api/tickets/${id}/complete`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to uncomplete ticket");
};
