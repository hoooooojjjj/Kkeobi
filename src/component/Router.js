import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../page/main/Main";
import UserInfo from "../page/UserInfo/UserInfo";
import MyPage from "../page/MyPage/MyPage";
import Chat from "../page/Chat/Chat";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/userinfo" element={<UserInfo />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/chat/:chatMode" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
