import React, { useEffect } from 'react';
import { useModal } from '../../../hooks/useModal'; 
import { ModalButtonAction } from '../../../utils/ModalTypes'; 
import styles from './css/AlertConfirmModal.module.css'; 

interface ModalWrapperProps {
    isVisible: boolean;
    children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, isVisible }) => 
    isVisible ? (
        <div className={styles.modalWrapper}>
            {children}
        </div>
    ) : null;

const ModalContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => 
    <div className={styles.modalContent}>
        {children}
    </div>;


const AlertConfirmModal: React.FC = () => {
    const { modalState } = useModal(); 
    const { 
        isVisible, 
        type, 
        title, 
        message, 
        confirmText = '확인', 
        cancelText = '취소', 
        onAction 
    } = modalState;

    // 모달 표시 시 바깥 스크롤 방지
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const handleAction = (action: ModalButtonAction) => {
        onAction(action);
    };
    
    // 타입에 따른 아이콘과 CSS 변수를 사용할 기본 색상 변수 이름 추출
    const getIconAndColorVar = () => {
        switch (type) {
            case 'success': return { icon: '✅', colorVar: 'var(--color-success)' };
            case 'error': return { icon: '❌', colorVar: 'var(--color-error)' };
            case 'confirm': return { icon: '❓', colorVar: 'var(--color-primary)' };
            default: return { icon: '🔔', colorVar: 'var(--color-info)' };
        }
    };

    const { icon, colorVar } = getIconAndColorVar();
    
    // 타입에 따라 동적으로 CSS 클래스를 결정하는 헬퍼 함수
    const getButtonClasses = (buttonType: 'confirm' | 'cancel') => {
        const classes = [styles.modalButton];
        if (buttonType === 'cancel') {
            classes.push(styles.cancelButton);
        } else { // 'confirm' 버튼
            classes.push(styles.confirmButton);
            if (type !== 'confirm') {
                classes.push(styles[type] || styles.defaultType); 
            }
        }
        return classes.join(' ');
    };

    return (
        <ModalWrapper isVisible={isVisible}>
            <ModalContent>
                <div className={styles.modalHeader}>
                    {icon && <div className={styles.modalIcon}>{icon}</div>}
                    <h3 className={styles.modalTitle} style={{ color: colorVar }}> 
                        {title || (type === 'alert' ? '알림' : '')}
                    </h3>
                    <p className={styles.modalMessage}>{message}</p>
                </div>
                
                <div className={styles.modalButtonArea}>
                    
                    {/* 취소 버튼 (Confirm 타입에만 표시) */}
                    {type === 'confirm' && (
                        <button 
                            onClick={() => handleAction('cancel')}
                            className={getButtonClasses('cancel')}
                        >
                            {cancelText}
                        </button>
                    )}

                    {/* 확인 버튼 */}
                    <button 
                        onClick={() => handleAction('confirm')}
                        className={getButtonClasses('confirm')}
                        style={{ 
                             color: type === 'confirm' ? colorVar : 'var(--color-surface)',
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </ModalContent>
        </ModalWrapper>
    );
};

export default AlertConfirmModal;