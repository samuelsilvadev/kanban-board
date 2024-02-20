import { Routes, Route } from "react-router-dom";
import { Tasks } from "./pages/Tasks";
import { Login } from "./pages/Login";
import { LoginCallback } from "./pages/LoginCallback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/auth/callback" element={<LoginCallback />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
