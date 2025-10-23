import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import styles from './profile-setup.module.css';

interface ProfileSetupForm {
    userAge?: number;
    disease?: string;
    familyHistory?: string;
    allergy?: string;
}

interface StepInfo {
    title: string;
    subtitle: string;
    field: keyof ProfileSetupForm;
    type: 'number' | 'text';
    placeholder?: string;
}

const STEPS: StepInfo[] = [
    {
        title: '나이를 알려주세요',
        subtitle: '맞춤 식단을 추천해 드릴게요',
        field: 'userAge',
        type: 'number'
    },
    {
        title: '현재 질병이 있나요?',
        subtitle: '식단 추천에 반영하겠습니다',
        field: 'disease',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요'
    },
    {
        title: '가족력이 있나요?',
        subtitle: '예방을 위한 식단을 추천해 드릴게요',
        field: 'familyHistory',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요'
    },
    {
        title: '알레르기가 있나요?',
        subtitle: '안전한 식단을 추천해 드릴게요',
        field: 'allergy',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요'
    }
];

const ProfileSetup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ProfileSetupForm>({});
    
    const currentStep = STEPS[step - 1];
    const progress = (step / STEPS.length) * 100;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < STEPS.length) {
            setStep(step + 1);
        } else {
            try {
                // TODO: API 호출로 데이터 저장
                navigate('/');
            } catch (error) {
                // TODO: 에러 처리
                console.error('Error saving profile:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'userAge' ? (value ? parseInt(value) : '') : value
        }));
    };

    const handleSkip = () => {
        navigate('/');
    };

    return (
        <Layout showHeader={false}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{currentStep.title}</h1>
                    <p className={styles.subtitle}>{currentStep.subtitle}</p>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${progress}%` }} 
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            {currentStep.type === 'number' ? (
                                <input
                                    type="number"
                                    id={currentStep.field}
                                    name={currentStep.field}
                                    value={formData[currentStep.field] || ''}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder={currentStep.placeholder}
                                    min="1"
                                    max="120"
                                    required
                                />
                            ) : (
                                <textarea
                                    id={currentStep.field}
                                    name={currentStep.field}
                                    value={formData[currentStep.field] || ''}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder={currentStep.placeholder}
                                    required
                                />
                            )}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.button}>
                                {step === STEPS.length ? '완료' : '다음'}
                            </button>
                            <button 
                                type="button" 
                                className={styles.skipButton}
                                onClick={handleSkip}
                            >
                                건너뛰기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSetup;