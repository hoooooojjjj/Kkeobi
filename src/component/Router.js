import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatComponent from "./OpenAI";
import Main from "../page/main/Main";
import UserInfo from "../page/UserInfo/UserInfo";
import MyPage from "../page/MyPage/MyPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
