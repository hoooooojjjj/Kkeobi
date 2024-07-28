import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatComponent from "../page/chat/OpenAI";
import App from "../App";
import Main from "../page/main/Main";
import Login from "./Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/chat" element={<ChatComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
