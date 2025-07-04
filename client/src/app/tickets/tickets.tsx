import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTicketContext } from "../context/TicketContext";
import styles from "./tickets.module.css";
import { createTicket, deleteTicket } from "../context/api";
type FilterType = "ALL" | "COMPLETED" | "INCOMPLETE";

const Tickets = () => {
  const { state, dispatch } = useTicketContext();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");

  const [filter, setFilter] = useState<FilterType>("ALL");

  const handleAdd = async () => {
    if (!description.trim()) return;
  
    const newTicketData = {
      description,
      completed: false,
      assigneeId: null,
    };
  
    try {
      const savedTicket = await createTicket(newTicketData);
      dispatch({ type: 'ADD_TICKET', payload: savedTicket });
      setDescription('');
    } catch (err) {
      console.error('Error adding ticket:', err);
    }
  };

  // no api delete yet
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;
  
    try {
      await deleteTicket(id);
      dispatch({ type: "DELETE_TICKET", payload: id });
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };
  

  const filteredTickets = state.tickets.filter((ticket) => {
    if (filter === "COMPLETED") return ticket.completed;
    if (filter === "INCOMPLETE") return !ticket.completed;
    return true;
  });

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}>Tickets</h2>

      <div className={styles["form"]}>
        <input
          type="text"
          placeholder="New ticket description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles["input"]}
        />
        <button onClick={handleAdd} className={styles["addButton"]}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={styles["filter"]}>
        <button
          className={`${styles["filterButton"]} ${
            styles["filter"] === "ALL" ? styles["active"] : ""
          }`}
          onClick={() => setFilter("ALL")}
        >
          All
        </button>
        <button
          className={`${styles["filterButton"]} ${
            filter === "COMPLETED" ? styles["active"] : ""
          }`}
          onClick={() => setFilter("COMPLETED")}
        >
          ✅ Completed
        </button>
        <button
          className={`${styles["filterButton"]} ${
            filter === "INCOMPLETE" ? styles["active"] : ""
          }`}
          onClick={() => setFilter("INCOMPLETE")}
        >
          ❌ Incomplete
        </button>
      </div>

      <ul className={styles["list"]}>
        {filteredTickets.length === 0 ? (
          <li className={styles["empty"]}>No tickets available</li>
        ) : (
          filteredTickets.map((ticket) => (
            <li key={ticket.id} className={styles["item"]}>
              <button
                className={styles["button"]}
                onClick={() => navigate(`/${ticket.id}`)}
              >
                #{ticket.id} - {ticket.description} [
                {ticket.completed ? "✅" : "❌"}]
              </button>

              {/* todo */}
              <button
                className={styles["deleteButton"]}
                onClick={() => handleDelete(ticket.id)}
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Tickets;
