import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserDetail, selectUser } from '../api/userDetail'; 
import { ProfileSetupForm, StepInfo, STEPS } from '../pages/user/profile/ts/steps'; 
import { getUserNumFromToken } from '../api/auth'; 

export const useProfileSetup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ProfileSetupForm>({
        userNum: undefined,
        userAge: undefined,
        disease: '',
        familyHistory: '',
        allergy: ''
    });
    // 기존 데이터는 내부 로직에서만 사용
    const [existingData, setExistingData] = useState<ProfileSetupForm | null>(null); 

    const userNum = useMemo(() => getUserNumFromToken(), []);
    const currentStep: StepInfo = STEPS[step - 1];
    const progress = (step / STEPS.length) * 100;

    // 1. 기존 유저 정보 가져오기 및 폼 데이터 초기화
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

    // 2. 입력 변경 핸들러
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'userAge' ? (value ? parseInt(value) : undefined) : value
        }));
    }, []);

    // 3. 버튼 옵션 클릭 핸들러 (쉼표 구분 값 토글)
    const handleOptionClick = useCallback((optionValue: string) => {
        const fieldName = currentStep.field as keyof Omit<ProfileSetupForm, 'userNum' | 'userAge'>;
        
        setFormData(prev => {
            const currentValue = (prev[fieldName] as string || '').trim();
            let newValue = currentValue;

            // 이미 포함된 값인지 확인
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
    }, [currentStep.field]);

    // 4. 제출/다음 단계 핸들러
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (step < STEPS.length) {
            setStep(step + 1); // 다음 단계로 이동
        } else {
            // 마지막 단계: 폼 제출
            try {
                await saveUserDetail(formData);
                navigate('/');
            } catch (err) {
                console.error('유저 정보 저장 중 오류', err);
            }
        }
    }, [step, formData, navigate]);

    // 5. 스킵 핸들러
    const handleSkip = useCallback(() => navigate('/'), [navigate]);

    return {
        step,
        formData,
        currentStep,
        progress,
        setStep, // StepBtn의 onNext에서 setStep(step + 1)을 직접 사용할 수 있도록 노출
        handleChange,
        handleOptionClick,
        handleSubmit,
        handleSkip,
        // STEPS는 컴포넌트에서 임포트하여 isLastStep을 계산
    };
};