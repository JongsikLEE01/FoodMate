import React from 'react';
import styles from './css/StepBtn.module.css';

interface StepBtnProps {
    isLastStep: boolean;
    onNext: () => void;
    onSkip: () => void;
}

const StepBtn: React.FC<StepBtnProps> = ({ isLastStep, onNext, onSkip }) => {
    return (
        <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
                {isLastStep ? '완료' : '다음'}
            </button>
            <button type="button" className={styles.skipButton} onClick={onSkip}>
                건너뛰기
            </button>
        </div>
    );
};

export default StepBtn;