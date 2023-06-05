import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import HomeEstudante from "./pages/estudante/HomeEstudante";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/user/home" element={<HomeEstudante />} />
      </Routes>
    </div>
  );
}

export default App;
