// src/hooks/Coin.ts
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { getCoin } from "../api/user";

// 1. Context 타입 및 객체 생성
interface CoinContextType {
    coin: number | null;
    setCoin: React.Dispatch<React.SetStateAction<number | null>>;
}
const CoinContext = createContext<CoinContextType | undefined>(undefined);

// 2. Provider 컴포넌트: 상태 관리 및 API 호출 담당
// React.FC를 사용하는 경우, 컴포넌트 본문에서 JSX를 'return' 해야 합니다.
export const CoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // 🚨 Error 2322 해결
    const [ coin, setCoin ] = useState<number | null>(null);

    useEffect(() => {
        const loadCoin = async () => {
            try {
                const balance = await getCoin();
                setCoin(balance);
            } catch (e) {
                console.error("코인 로드 실패:", e);
                setCoin(0); 
            };
        }
        loadCoin();
    }, []); 

    // 🚨 JSX 반환 (Error 2503 등 문법 오류 해결)
    return ( 
        <CoinContext.Provider value={{ coin, setCoin }}>
            {children}
        </CoinContext.Provider>
    );
}

// 3. useCoin Custom Hook: Context 사용을 간소화
export const useCoin = () => {
    const context = useContext(CoinContext);
    if (context === undefined) {
        throw new Error('useCoin must be used within a CoinProvider');
    }
    return context;
};