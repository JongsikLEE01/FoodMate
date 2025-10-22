import React, { useState } from 'react';

const HomePage: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 호출 구현
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-10">
                <h1 className="text-3xl font-bold mb-8">
                    안녕하세요, 푸드메이트입니다
                </h1>
            </div>
            
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;