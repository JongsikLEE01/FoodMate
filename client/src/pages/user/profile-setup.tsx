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

const ProfileSetup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ProfileSetupForm>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 4) {
            setStep(step + 1);
        } else {
            try {
                // 메인페이지로 이동
                navigate('/');
            } catch {
                // 에러 발생 시 처리
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'userAge' ? parseInt(value) : value
        }));
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className={styles.inputGroup}>
                        <label htmlFor="userAge" className={styles.label}>
                            나이를 입력해주세요
                        </label>
                        <input
                            type="number"
                            id="userAge"
                            name="userAge"
                            value={formData.userAge || ''}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                );
            case 2:
                return (
                    <div className={styles.inputGroup}>
                        <label htmlFor="disease" className={styles.label}>
                            보유하고 계신 질병을 입력해주세요
                        </label>
                        <textarea
                            id="disease"
                            name="disease"
                            value={formData.disease || ''}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="없으시다면 '없음'이라고 입력해주세요"
                            required
                        />
                    </div>
                );
            case 3:
                return (
                    <div className={styles.inputGroup}>
                        <label htmlFor="familyHistory" className={styles.label}>
                            가족력을 입력해주세요
                        </label>
                        <textarea
                            id="familyHistory"
                            name="familyHistory"
                            value={formData.familyHistory || ''}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="없으시다면 '없음'이라고 입력해주세요"
                            required
                        />
                    </div>
                );
            case 4:
                return (
                    <div className={styles.inputGroup}>
                        <label htmlFor="allergy" className={styles.label}>
                            알레르기가 있으신가요?
                        </label>
                        <textarea
                            id="allergy"
                            name="allergy"
                            value={formData.allergy || ''}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="없으시다면 '없음'이라고 입력해주세요"
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout title="프로필 설정" showFooter={false}>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <p className={styles.stepIndicator}>단계 {step}/4</p>
                    <form onSubmit={handleSubmit}>
                        {renderStepContent()}
                        <button type="submit" className={styles.button}>
                            {step === 4 ? '완료' : '다음'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSetup;