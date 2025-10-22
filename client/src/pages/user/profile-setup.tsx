import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                // TODO: API 호출 구현
                // await submitUserProfile(formData);
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
                    <div>
                        <label htmlFor="userAge" className="block mb-1">나이를 입력해주세요</label>
                        <input
                            type="number"
                            id="userAge"
                            name="userAge"
                            value={formData.userAge || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <label htmlFor="disease" className="block mb-1">보유하고 계신 질병을 입력해주세요</label>
                        <textarea
                            id="disease"
                            name="disease"
                            value={formData.disease || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="없으시다면 '없음'이라고 입력해주세요"
                            required
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <label htmlFor="familyHistory" className="block mb-1">가족력을 입력해주세요</label>
                        <textarea
                            id="familyHistory"
                            name="familyHistory"
                            value={formData.familyHistory || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="없으시다면 '없음'이라고 입력해주세요"
                            required
                        />
                    </div>
                );
            case 4:
                return (
                    <div>
                        <label htmlFor="allergy" className="block mb-1">알레르기가 있으신가요?</label>
                        <textarea
                            id="allergy"
                            name="allergy"
                            value={formData.allergy || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">프로필 설정</h1>
                    <p className="text-gray-600">단계 {step}/4</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {renderStepContent()}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {step === 4 ? '완료' : '다음'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;