import { ModalType } from './ModalTypes';


let globalShowModal: ((props: any) => void) | null = null; 


export const initModalUtils = (showFn: (props: any) => void) => {
    globalShowModal = showFn;
};


// 공용 alert
export const showAlert = (message: string, type: Exclude<ModalType, 'confirm'> = 'alert', title?: string): Promise<void> => {
    return new Promise((resolve) => {
        if (!globalShowModal) {
            console.error("ModalProvider가 렌더링되지 않았습니다.");
            return resolve();
        }
        
        const resolver = () => resolve(); 

        globalShowModal({
            type,
            title: title || (type === 'error' ? '오류 발생' : type === 'success' ? '성공' : '알림'),
            message,
            resolver,
            confirmText: '확인'
        });
    });
};

// 공용 Confirm
export const showConfirm = (message: string, title: string = '확인 요청'): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!globalShowModal) {
            console.error("ModalProvider가 렌더링되지 않았습니다.");
            return resolve(false);
        }
        
        const resolver = (value: boolean) => resolve(value);

        globalShowModal({
            type: 'confirm',
            title,
            message,
            resolver,
            confirmText: '확인',
            cancelText: '취소'
        });
    });
};