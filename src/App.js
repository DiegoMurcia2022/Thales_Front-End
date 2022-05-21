//Develop by Diego Murcia

import { Routes, Route, Link } from "react-router-dom";
import EmployeeSearch from "./components/EmployeeSearch";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeeSearch />} />
      </Routes>
    </div>
  );
}

export default App;
