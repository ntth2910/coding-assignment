import { Routes, Route } from "react-router-dom";
import { TicketProvider } from "./context/ticket/TicketContext";
import Tickets from "./tickets/tickets";
import TicketDetails from "./tickets/TicketDetails";
import UserManagement from "./users/UserManagement";
import { UserProvider } from "./context/user/UserContext";

const App = () => (
  <TicketProvider>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </UserProvider>
  </TicketProvider>
);

export default App;
