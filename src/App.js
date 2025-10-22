import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "./services/api";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import BoardWrite from "./pages/BoardWrite";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.username);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board user={user} />} />
          <Route path="/board/:id" element={<BoardDetail user={user} />} />
          <Route path="/board/write" element={<BoardWrite user={user} />} />
          <Route path="/board/:id/edit" element={<BoardWrite user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
