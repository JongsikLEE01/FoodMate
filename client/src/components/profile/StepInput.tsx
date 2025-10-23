import react from 'react';
import styles from './css/StepInput.module.css'

interface StepInputProps {
    field : string;
    type : 'number' | 'text';
    value : any;
    placeholder? : string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const StepInput: React.FC<StepInputProps> = ({ field, type, value, placeholder, onChange }) => {
    return (
        <div className={styles.inputGroup}>
            {type === 'number' ? (
                <input
                    type="number"
                    id={field}
                    name={field}
                    value={value || ''}
                    onChange={onChange}
                    className={styles.input}
                    placeholder={placeholder}
                    min="1"
                    max="120"
                    required
                />
            ) : (
                <textarea
                    id={field}
                    name={field}
                    value={value || ''}
                    onChange={onChange}
                    className={styles.input}
                    placeholder={placeholder}
                    required
                />
            )}
        </div>
    );
};

export default StepInput;