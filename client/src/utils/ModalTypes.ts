export type ModalType = 'alert' | 'confirm' | 'success' | 'error';
export type ModalButtonAction = 'confirm' | 'cancel';

// 컴포넌트가 받는 Props 타입
export interface ModalProps {
    // 필수
    type: ModalType; 
    message: string;
    
    // 선택
    title?: string;
    confirmText?: string;
    cancelText?: string;

    onAction: (action: ModalButtonAction) => void;
}

// ModalContext에서 관리할 상태 타입
export interface ModalState extends ModalProps {
    isVisible: boolean;
    resolver?: (value: boolean) => void; 
}

// ModalContext에서 제공할 함수 및 상태 타입
export interface ModalContextType {
    show: (props: Omit<ModalProps, 'onAction'> & { resolver: (value: boolean) => void }) => void;
    hide: () => void;
    modalState: ModalState;
}