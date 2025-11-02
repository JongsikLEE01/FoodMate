import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import AlertConfirmModal from './AlertConfirmModal';
import { ModalState, ModalContextType, ModalProps, ModalButtonAction } from '../../../utils/ModalTypes';
import { initModalUtils } from '../../../utils/modalUtil';

// Context 생성
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 초기 상태 정의
const initialModalState: ModalState = {
    isVisible: false,
    type: 'alert',
    message: '',
    onAction: (action: ModalButtonAction) => {},
};

// ModalProvider
export const ModalProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [modalState, setModalState] = useState<ModalState>(initialModalState);

    // 모달 표시 함수
    const show = useCallback(
        ({ resolver, ...props }: Omit<ModalProps, 'onAction'> & { resolver: (value: boolean) => void }) => {
            setModalState({
                ...props,
                isVisible: true,
                onAction: (action: ModalButtonAction) => {
                    if (resolver) {
                        resolver(action === 'confirm'); 
                    }
                    setModalState(initialModalState); 
                },
            });
        },
        []
    );

    // 모달 숨기기 함수
    const hide = useCallback(() => {
        setModalState(initialModalState);
    }, []);

    const contextValue = useMemo(() => ({
        show,
        hide,
        modalState,
    }), [show, hide, modalState]);
    
    // 3. 유틸리티 함수 초기화
    useEffect(() => {
        initModalUtils(show);
    }, [show]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            <AlertConfirmModal /> 
        </ModalContext.Provider>
    );
};