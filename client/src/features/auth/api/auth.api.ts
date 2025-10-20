import axios from "axios";

export const kakaoLogin = async (accessToken: string) => {

  const res = await axios.post("http://localhost:8080/users/kakao", {
    accessToken,
  });
  return res.data;
};

export {};
