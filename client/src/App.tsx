import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App as AntdApp } from "antd";

import Book from "./views/Book";

function App() {
  return (
    <>
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Book} />
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </>
  );
}

export default App;
