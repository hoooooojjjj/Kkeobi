import React, { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { userObjContext } from "../App";
import { GoogleLoginImg } from "../page/main/MainStyle";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
function Login() {
  // 유저 정보
  const [userObj, setUserObj] = useContext(userObjContext);

  const nav = useNavigate();

  // 구글 로그인
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // 유저 정보 Firestore에서 확인
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
        } else {
          // Firestore에 유저 정보 저장
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            accessToken: user.accessToken,
          });
          nav("/userinfo");
        }
      })
      .catch((error) => {
        console.log("로그인 에러 : " + error);
      });
  };

  // 로그아웃
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("로그아웃 성공");
        setUserObj(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return userObj ? (
    <button onClick={handleLogout}>로그아웃</button>
  ) : (
    <GoogleLoginImg
      onClick={handleGoogleLogin}
      src={process.env.PUBLIC_URL + `/assets/google.png`}
      alt="구글 로그인"
    />
  );
}

export default Login;
