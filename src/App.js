import { createContext, useEffect, useState } from "react";
import Router from "./component/Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const userObjContext = createContext();

function App() {
  // 유저 정보 객체
  const [userObj, setUserObj] = useState(null);

  // 현재 사용자가 로그인 되어있는지 확인 후 유저 정보 가져오기
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 로그인이 되어있다면
      if (user) {
        setUserObj(user);
      }
    });
  }, []);
  return (
    <>
      <userObjContext.Provider value={[userObj, setUserObj]}>
        <Router />
      </userObjContext.Provider>
    </>
  );
}

export default App;
