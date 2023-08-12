import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages copy/Login/Login";
import Signup from "./pages copy/Signup/Signup";
import Home from "./pages copy/Home/Home";
import Contribute from "./components/Contribute/Contribute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exect path="/" element={<Home />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
