import { createContext, useEffect, useState } from "react";
import Router from "./component/Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useQuery } from "@tanstack/react-query";
import { Iphone } from "./containerStyle";

export const userObjContext = createContext();

// 현재 사용자 정보 가져오기
export const getUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();

        resolve(user);
      },
      reject
    );
  });
};

function App() {
  // 현재 사용자가 로그인 되어있는지 확인 후 유저 정보 가져오기
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <userObjContext.Provider value={{ isPending, isError, data, error }}>
      <Iphone
        src={process.env.PUBLIC_URL + `/assets/iphonePng.png`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Router />
      </Iphone>
    </userObjContext.Provider>
  );
}

export default App;
