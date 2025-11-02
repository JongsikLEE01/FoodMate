import { useContext } from 'react';
import { ModalContext } from '../components/common/Modal/ModalProvider';

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('모달을 읽어올 수 없습니다.');
    }
    return context;
};