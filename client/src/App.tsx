import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./views/Book";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Book} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
