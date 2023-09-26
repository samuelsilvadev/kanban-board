import { Routes, Route } from "react-router-dom";
import { Tasks } from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
    </Routes>
  );
}

export default App;
