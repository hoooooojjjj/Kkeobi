import React, { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { userObjContext } from "../App";
import { GoogleLoginImg } from "../page/main/MainStyle";
import { useNavigate } from "react-router-dom";
function Login() {
  // 유저 정보
  const userObj = useContext(userObjContext);

  const nav = useNavigate();

  // 구글 로그인
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        // const token = credential.accessToken;

        const user = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 로그아웃
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <GoogleLoginImg
        onClick={handleGoogleLogin}
        src={process.env.PUBLIC_URL + `/assets/google.png`}
        alt="구글 로그인"
      />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Login;
