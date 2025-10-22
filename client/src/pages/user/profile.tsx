import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userAge: '',
        disease: '',
        familyHistory: '',
        allergy: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/user/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            navigate('/'); // 성공 시 메인 페이지로 이동
        } catch (error) {
            console.error('프로필 설정 실패:', error);
            alert('프로필 설정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">사용자 정보 입력</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">나이</label>
                    <input
                        type="number"
                        name="userAge"
                        value={formData.userAge}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">보유 질병</label>
                    <textarea
                        name="disease"
                        value={formData.disease}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="있는 경우에만 입력해주세요"
                    />
                </div>
                <div>
                    <label className="block mb-2">가족력</label>
                    <textarea
                        name="familyHistory"
                        value={formData.familyHistory}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="있는 경우에만 입력해주세요"
                    />
                </div>
                <div>
                    <label className="block mb-2">알러지</label>
                    <textarea
                        name="allergy"
                        value={formData.allergy}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="있는 경우에만 입력해주세요"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    저장하기
                </button>
            </form>
        </div>
    );
};

export default ProfileSetupPage;