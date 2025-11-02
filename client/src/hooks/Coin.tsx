import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { getCoin } from "../api/user";

// Context 타입 및 객체 생성
interface CoinContextType {
    coin: number | null;
    setCoin: React.Dispatch<React.SetStateAction<number | null>>;
}
const CoinContext = createContext<CoinContextType | undefined>(undefined);

// Provider 컴포넌트: 상태 관리 및 API 호출 담당
export const CoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ coin, setCoin ] = useState<number | null>(null);

    useEffect(() => {
        const loadCoin = async () => {
            try {
                const balance = await getCoin();
                setCoin(balance);
            } catch (e) {
                setCoin(0); 
            };
        }
        loadCoin();
    }, []); 

    // JSX 반환
    return ( 
        <CoinContext.Provider value={{ coin, setCoin }}>
            {children}
        </CoinContext.Provider>
    );
}

// useCoin Custom Hook
export const useCoin = () => {
    const context = useContext(CoinContext);
    if (context === undefined) {
        throw new Error('코인을 불러올 수 없습니다.');
    }
    return context;
};