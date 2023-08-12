import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import Contribute from "./components/Contribute/Contribute";

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Navbar />
      <Routes>
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
=======
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
>>>>>>> bc2244825e3a87aeb54df6911a6d0cd31e38daf0
      <Footer />
    </Router>
  );
}

export default App;
