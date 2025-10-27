// 날짜 포맷팅
export const formatTime = (isoString: string): string => {
    if (!isoString) return '';
    
    try {
        const date = new Date(isoString);
        
        // Date 객체 확인
        if (isNaN(date.getTime())) {
            return isoString;
        }

        // 시:분 및 오전/오후 표시
        const formatter = new Intl.DateTimeFormat('ko-KR', {
            hour: '2-digit',      // 시
            minute: '2-digit',    // 분
            hour12: true,         // 12시간제 사용
        });

        // 포맷 결과에서 띄어쓰기 문제 등을 해결하기 위해 처리
        let formattedTime = formatter.format(date);
        
        // 1자리 시에 0을 붙여 두 자리로 보정
        formattedTime = formattedTime.replace(/(\s\d):/g, (match, hour) => {
            return ` 0${hour.trim()}:`;
        });
        
        return formattedTime.trim();

    } catch (e) {
        console.error("날짜 포맷 오류:", e);
        return isoString;
    }
};