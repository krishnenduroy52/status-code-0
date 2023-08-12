import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Contribute from "./components/Contribute/Contribute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/contribute" element={<Contribute />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
