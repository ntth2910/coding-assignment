import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTicketContext } from '../context/ticket/TicketContext';
import {
  assignTicket,
  unassignTicket,
  completeTicket,
  uncompleteTicket,
} from '../context/ticket/api';
import styles from './ticketDetails.module.css';

const TicketDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useTicketContext();
  const navigate = useNavigate();
  const ticket = state.tickets.find((t) => t.id === Number(id));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticket && id) {
      fetch(`/api/tickets/${id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'UPDATE_TICKET', payload: data });
        });
    }
  }, [id, ticket, dispatch]);

  if (!ticket) return <p>Loading...</p>;

  const assignee = state.users.find((u) => u.id === ticket.assigneeId);

  const handleAssign = async (userId: number) => {
    setLoading(true);
    try {
      await assignTicket(ticket.id, userId);
      dispatch({
        type: 'UPDATE_TICKET',
        payload: { ...ticket, assigneeId: userId },
      });
    } catch (err) {
      console.error('Assign failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async () => {
    setLoading(true);
    try {
      await unassignTicket(ticket.id);
      dispatch({
        type: 'UPDATE_TICKET',
        payload: { ...ticket, assigneeId: null },
      });
    } catch (err) {
      console.error('Unassign failed', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async () => {
    setLoading(true);
    try {
      if (ticket.completed) {
        await uncompleteTicket(ticket.id);
      } else {
        await completeTicket(ticket.id);
      }
      dispatch({
        type: 'UPDATE_TICKET',
        payload: { ...ticket, completed: !ticket.completed },
      });
    } catch (err) {
      console.error('Toggle failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Ticket #{ticket.id}</h2>
      <p className={styles['description']}>{ticket.description}</p>
      <p>
        Status:{' '}
        <span className={ticket.completed ? styles['done'] : styles['notDone']}>
          {ticket.completed ? '✅ Completed' : '❌ Incomplete'}
        </span>
      </p>

      <button onClick={toggleComplete} disabled={loading} className={styles['button']}>
        Toggle Complete
      </button>

      <div className={styles['assigneeSection']}>
        <p>
          Assignee:{' '}
          {assignee ? (
            <>
              <strong>{assignee.name}</strong>{' '}
              <button onClick={handleUnassign} disabled={loading} className={styles['unassignButton']}>
                Unassign
              </button>
            </>
          ) : (
            'None'
          )}
        </p>

        <select
          disabled={loading}
          onChange={(e) => handleAssign(Number(e.target.value))}
          defaultValue=""
          className={styles['select']}
        >
          <option value="" disabled>
            Assign to...
          </option>
          {state.users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => navigate('/')} className={styles['backButton']}>
        ← Back to List
      </button>
    </div>
  );
};

export default TicketDetails;
