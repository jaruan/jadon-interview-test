import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Book from "./views/Book";
import { App as AntdApp } from "antd";

function App() {
  return (
    <AntdApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Book} />
        </Routes>
      </BrowserRouter>
    </AntdApp>
  );
}

export default App;
