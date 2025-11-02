// src/components/TestModal.tsx

import React from 'react';
// 유틸리티 파일 임포트 (경로는 실제 구조에 맞게 조정 필요)
import { showAlert, showConfirm } from '../utils/modalUtil'; 
import { useNavigate } from 'react-router-dom';

const TestModal: React.FC = () => {

    // 1. Alert (성공 타입) 테스트
    const handleSuccess = async () => {
        console.log('--- Success Alert 호출 ---');
        await showAlert('데이터가 성공적으로 업데이트되었습니다.', 'success', '완료');
        console.log('Success Alert 닫힘.');
    };

    // 2. Alert (에러 타입) 테스트
    const handleError = async () => {
        console.log('--- Error Alert 호출 ---');
        await showAlert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error', '네트워크 오류');
        console.log('Error Alert 닫힘.');
    };

    // 3. Confirm (확인/취소) 테스트
    const handleConfirm = async () => {
        console.log('--- Confirm 호출 (선택 대기) ---');
        
        // showConfirm 함수는 Promise<boolean>을 반환합니다.
        const result = await showConfirm('정말로 이 항목을 삭제하시겠습니까?', '중요 확인');

        if (result) {
            console.log('사용자가 [확인]을 눌렀습니다. (true)');
            await showAlert('선택하신 항목이 삭제되었습니다.', 'alert');
        } else {
            console.log('사용자가 [취소]를 눌렀습니다. (false)');
            await showAlert('삭제가 취소되었습니다.', 'alert');
        }
    };

    // 4. 일반 Alert 테스트
    const handleBasicAlert = async () => {
        console.log('--- 기본 Alert 호출 ---');
        await showAlert('이것은 기본적인 알림 메시지입니다.', 'alert');
        console.log('기본 Alert 닫힘.');
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>모달 시스템 테스트</h2>
            <button onClick={handleSuccess} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                ✅ Success Alert 테스트
            </button>
            <button onClick={handleError} style={{ padding: '10px', backgroundColor: '#F44336', color: 'white', border: 'none' }}>
                ❌ Error Alert 테스트
            </button>
            <button onClick={handleConfirm} style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}>
                ❓ Confirm 테스트 (비동기 결과 확인)
            </button>
            <button onClick={handleBasicAlert} style={{ padding: '10px', backgroundColor: '#ccc', color: '#333', border: 'none' }}>
                🔔 기본 Alert 테스트
            </button>
        </div>
    );
};

export default TestModal;