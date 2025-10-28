import axios from "axios";
import { getAccessToken } from "./auth";

export const getCoin = async () : Promise<number> => {
    const token = getAccessToken();
    if (!token) throw new Error("JWT 토큰이 없습니다.");

    try{
        const res = await axios.get<number>(`http://localhost:8080/user/coin`, {
            headers : { Authorization : `Bearer ${token}` },
        });

        if (typeof res.data !== 'number') {
             throw new Error("서버에서 유효하지 않은 코인 잔액을 받았습니다.");
        }
        
        return res.data;
    } catch(e) {
        console.error("코인 로드 실패", e);
        throw e;
    }
}