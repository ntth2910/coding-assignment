import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tickets from '../tickets/tickets';
import { TicketProvider } from '../context/TicketContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockState = {
  tickets: [
    { id: 1, description: 'Fix bug', completed: false, assigneeId: null },
    { id: 2, description: 'Implement feature', completed: true, assigneeId: null },
  ],
};

const mockDispatch = jest.fn();

jest.mock('../context/TicketContext', () => ({
  useTicketContext: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders filtered tickets - ALL', () => {
  render(<Tickets />);

  expect(screen.getByText(/#1 - Fix bug \[❌\]/i)).toBeInTheDocument();
  expect(screen.getByText(/#2 - Implement feature \[✅\]/i)).toBeInTheDocument();
});

test('filters to only completed tickets', async () => {
  render(<Tickets />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /✅ Completed/i }));

  expect(screen.queryByText(/#1 - Fix bug/i)).not.toBeInTheDocument();
  expect(screen.getByText(/#2 - Implement feature/i)).toBeInTheDocument();
});

test('filters to only incomplete tickets', async () => {
  render(<Tickets />);
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /❌ Incomplete/i }));

  expect(screen.getByText(/#1 - Fix bug/i)).toBeInTheDocument();
  expect(screen.queryByText(/#2 - Implement feature/i)).not.toBeInTheDocument();
});

test('adds a new ticket', async () => {
  render(<Tickets />);
  const user = userEvent.setup();

  const input = screen.getByPlaceholderText(/new ticket description/i);
  await user.type(input, 'New task');
  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(mockDispatch).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'ADD_TICKET',
      payload: expect.objectContaining({
        description: 'New task',
        completed: false,
        assigneeId: null,
      }),
    })
  );
});

test('navigates to ticket detail on click', async () => {
  render(<Tickets />);
  const user = userEvent.setup();

  const ticketItem = screen.getByText(/#1 - Fix bug/i);
  await user.click(ticketItem);

  expect(mockNavigate).toHaveBeenCalledWith('/1');
});
test('renders empty state when no tickets', () => {
  mockState.tickets = [];
  render(<Tickets />);

  expect(screen.getByText(/no tickets available/i)).toBeInTheDocument();
});
