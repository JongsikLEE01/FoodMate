import React from 'react';
import styles from './css/StepButtonSelector.module.css';

interface StepButtonSelectorProps {
    options: string[];
    currentValue: string;
    onOptionClick: (value: string) => void;
}

const StepButtonSelector: React.FC<StepButtonSelectorProps> = ({ options, onOptionClick }) => {
    return (
        <div className={styles.buttonContainer}>
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={styles.button}
                    onClick={() => onOptionClick(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default StepButtonSelector;