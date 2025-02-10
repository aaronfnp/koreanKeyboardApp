import { useState, useEffect, useCallback } from "react";
import "./App.css";


import InputContainer from "./components/InputContainer";
import CSVComponent from "./components/CSVComponent";
import BookDisplay from "./pages/BookDisplay";
import Home from "./pages/Home";
import Typing from "./pages/Typing";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BookDisplay />} />
        <Route path="/input" element={<InputContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/typing" element={<Typing />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
