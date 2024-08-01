import React, { useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { getUser, userObjContext } from "../App";
import { GoogleLoginImg } from "../page/main/MainStyle";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";

function Login({ isChatRoomExpanded }) {
  // 유저 정보
  const { data } = useContext(userObjContext);

  // 로당
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const queryClient = useQueryClient();

  // 유저 정보 변경 시 다시 fetch
  const mutation = useMutation({
    mutationFn: getUser,
    // 성공되었을 때
    onSuccess: () => {
      // 유저 정보 다시 fetch
      queryClient.invalidateQueries("getUser");
    },
    // 에러 발생 시
    onError: (error) => {
      console.error("Error deleting item:", error.message);
    },
  });

  // 구글 로그인
  const handleGoogleLogin = () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setIsLoading(false);

        // 로그인 성공 시 유저 정보 다시 fetch
        mutation.mutate();

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
        setIsLoading(false);
        console.log("로그인 에러 : " + error);
      });
  };

  // 로그아웃
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("로그아웃 성공");
        // 로그아웃 성공 시 유저 정보 다시 fetch
        mutation.mutate();
        nav("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (isChatRoomExpanded) {
    return null;
  }

  return data ? (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <button
        style={{
          border: "none",
          background: "none",
          textDecoration: "underline",
        }}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  ) : isLoading ? (
    <div
      style={{
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin></Spin>
    </div>
  ) : (
    <GoogleLoginImg
      onClick={handleGoogleLogin}
      src={process.env.PUBLIC_URL + `assets/google.png`}
      alt="구글 로그인"
    />
  );
}

export default Login;
