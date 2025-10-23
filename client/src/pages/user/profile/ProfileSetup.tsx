import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/common/Layout';
import { createUserDetail, selectUser, updateUserDetail } from '../../../api/userDetail';
import { ProfileSetupForm, STEPS, StepInfo } from './ts/steps';
import StepInput from '../../../components/profile/StepInput';
import StepBtn from '../../../components/profile/StepBtn';
import ProgressBar from '../../../components/profile/ProgressBar';
import styles from './css/profile-setup.module.css'
import { getUserNumFromToken } from '../../../api/auth'

const ProfileSetup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ProfileSetupForm>({});
    const [existingData, setExistingData] = useState<ProfileSetupForm | null > (null);

    const currentStep: StepInfo = STEPS[step - 1];
    const progress = (step / STEPS.length) * 100;
    const userNum = getUserNumFromToken();

    // 기존 유저 정보 가져오기
    useEffect(() => {
        const fetchUser = async () => {
            if(!userNum) throw new Error('로그인 정보가 존재하지 않습니다.');

            try {
                const data = await selectUser({userNum});
                if (data) {
                    setExistingData(data);
                    setFormData(data);
                }
            } catch (err) {
                console.error('유저 정보 조회 실패', err);
            }
        };
        fetchUser();
    }, [userNum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: name === 'userAge' ? (value ? parseInt(value) : '') : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < STEPS.length) {
            setStep(step + 1);
        } else {
            try {
                if(!userNum) throw new Error('로그인 정보가 존재하지 않습니다.');

                if (existingData) {
                    await updateUserDetail({...formData, userNum});
                } else {
                    await createUserDetail({...formData, userNum});
                }
                navigate('/');
            } catch (err) {
                console.error('유저 정보 저장 중 오류', err);
            }
        }
    };

    const handleSkip = () => navigate('/');

    return (
        <Layout showHeader={false}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{currentStep.title}</h1>
                    <p className={styles.subtitle}>{currentStep.subtitle}</p>
                </div>

                <div className={styles.formContainer}>
                    <ProgressBar progress={progress} />

                    <form onSubmit={handleSubmit}>
                        <StepInput
                            field={currentStep.field}
                            type={currentStep.type}
                            value={formData[currentStep.field]}
                            placeholder={currentStep.placeholder}
                            onChange={handleChange}
                        />

                        <StepBtn
                            isLastStep={step === STEPS.length}
                            onNext={() => setStep(step + 1)}
                            onSkip={handleSkip}
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSetup;