import {  Routes, Route } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import Tickets from './tickets/tickets';
import TicketDetails from './tickets/TicketDetails';

const App = () => (
  <TicketProvider>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
  </TicketProvider>
);

export default App;
