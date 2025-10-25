import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/common/Layout/Layout';
import { saveUserDetail, selectUser } from '../../../api/userDetail';
import { ProfileSetupForm, STEPS, StepInfo } from './ts/steps';
import StepInput from '../../../components/profile/StepInput';
import StepBtn from '../../../components/profile/StepBtn';
import ProgressBar from '../../../components/profile/ProgressBar';
import StepButtonSelector from '../../../components/profile/StepButtonSelector'; // 👈 StepButtonSelector 임포트
import styles from './css/profile-setup.module.css';
import { getUserNumFromToken } from '../../../api/auth';

const ProfileSetup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ProfileSetupForm>({
        userNum: undefined,
        userAge: undefined,
        disease: '',
        familyHistory: '',
        allergy: ''
    });
    const [existingData, setExistingData] = useState<ProfileSetupForm | null>(null);

    const currentStep: StepInfo = STEPS[step - 1];
    const progress = (step / STEPS.length) * 100;
    const userNum = getUserNumFromToken();

    // 기존 유저 정보 가져오기 (이 부분은 변경 없음)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await selectUser();
                const num = getUserNumFromToken();

                if (data) {
                    setExistingData(data);
                    setFormData(prev => ({
                        ...prev,
                        ...data,
                        userNum: prev.userNum ?? num
                    }));
                } else if (num) {
                    setFormData(prev => ({ ...prev, userNum: num }));
                }
            } catch (err) {
                console.error('유저 정보 조회 실패', err);
            }
        };
        fetchUser();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'userAge' ? (value ? parseInt(value) : undefined) : value
        }));
    };

    // 👈 버튼 클릭 핸들러 추가: 값들을 쉼표로 구분하여 저장
    const handleOptionClick = (optionValue: string) => {
        const fieldName = currentStep.field as keyof Omit<ProfileSetupForm, 'userNum' | 'userAge'>;
        
        setFormData(prev => {
            const currentValue = (prev[fieldName] || '').trim();
            let newValue = currentValue;

            // 이미 포함된 값인지 확인 (쉼표로 구분된 문자열 기준)
            const valuesArray = currentValue.split(',').map(v => v.trim()).filter(v => v.length > 0);
            
            if (valuesArray.includes(optionValue)) {
                // 이미 있다면 제거 (토글)
                const filteredArray = valuesArray.filter(v => v !== optionValue);
                newValue = filteredArray.join(', ');
            } else {
                // 없다면 추가
                newValue = currentValue.length > 0
                    ? `${currentValue}, ${optionValue}`
                    : optionValue;
            }

            return {
                ...prev,
                [fieldName]: newValue
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step < STEPS.length) {
            setStep(step + 1);
        } else {
            try {
                console.log('저장될 데이터:', formData);
                await saveUserDetail(formData);
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

                        {/* 👈 버튼 셀렉터 렌더링 추가 */}
                        {currentStep.options && currentStep.options.length > 0 && (
                            <StepButtonSelector
                                options={currentStep.options}
                                currentValue={formData[currentStep.field] as string || ''}
                                onOptionClick={handleOptionClick}
                            />
                        )}

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