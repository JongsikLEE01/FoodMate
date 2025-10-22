import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoCheck: React.FC = () => {
    const navigate = useNavigate();

    const handleChoice = (hasInfo: boolean) => {
        if (hasInfo) {
            navigate('/'); // 정보가 있는 경우 메인 페이지로
        } else {
            navigate('/user/profile-setup'); // 정보가 없는 경우 입력 폼으로
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold">
                    입력해둔 정보가 있으신가요?
                </h2>
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={() => handleChoice(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        예
                    </button>
                    <button
                        onClick={() => handleChoice(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCheck;