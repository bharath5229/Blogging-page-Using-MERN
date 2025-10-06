import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BlogEditor from "./pages/BlogEditor";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/edit/:id" element={<BlogEditor user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
