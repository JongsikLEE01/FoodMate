// 날짜 데이터를 Date 객체로 변환
const safeParseDate = (dateData: any): Date => {
    if (dateData instanceof Date && !isNaN(dateData.getTime())) {
        return dateData;
    }
    
    if (typeof dateData === 'string') {
        if (dateData.includes('-') && dateData.includes('T') && dateData.includes(':')) {
             const date = new Date(dateData);
             if (!isNaN(date.getTime())) {
                 return date;
             }
        }
        
        if (dateData.includes(',')) {
            const cleanedString = dateData.replace(/\s/g, ''); 
            const parts = cleanedString.split(',').map(part => parseInt(part, 10));
            
            if (parts.length === 6 && !parts.some(isNaN)) {
                const [year, month, day, hour, minute, second] = parts;
                const date = new Date(year, month - 1, day, hour, minute, second);
                if (!isNaN(date.getTime())) {
                     return date;
                }
            }
        }

        return new Date(NaN);
    } else if (Array.isArray(dateData)) {
        const parts = dateData.map(val => parseInt(val, 10));
        
        if (parts.length === 6 && !parts.some(isNaN)) {
            const [year, month, day, hour, minute, second] = parts;
            const date = new Date(year, month - 1, day, hour, minute, second);
            if (!isNaN(date.getTime())) {
                 return date;
            }
        }
        
        return new Date(NaN);
    } else {
        console.error("유효하지 않은 날짜 타입입니다.", dateData);
        return new Date(NaN);
    }
};

// 시간 포맷(오전 00:00)
export const formatTime = (isoString: any): string => {
    if (!isoString) return '';
    
    try {
        const date = safeParseDate(isoString); 
        
        if (isNaN(date.getTime())) {
            return '시간 오류'; 
        }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;
        
        const paddedHour = String(displayHour).padStart(2, '0');
        const paddedMinute = String(minutes).padStart(2, '0');

        return `${ampm} ${paddedHour}:${paddedMinute}`;
        
    } catch (e) {
        return '시간 오류';
    }
};

// 날짜 포맷(0000년 00월 00일)
export const formatDateOnly = (isoString: any): string => {
    if (!isoString) return '';
    
    try {
        const date = safeParseDate(isoString); 
        
        if (isNaN(date.getTime())) return '';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1); 
        const day = String(date.getDate());
        
        return `${year}년 ${month}월 ${day}일`;
    } catch (e) {
        return '';
    }
};