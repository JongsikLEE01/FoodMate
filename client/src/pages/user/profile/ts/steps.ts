export interface ProfileSetupForm {
    userNum?: number;
    userAge?: number;
    disease?: string;
    familyHistory?: string;
    allergy?: string;
}

export interface StepInfo {
    title: string;
    subtitle: string;
    field: keyof ProfileSetupForm;
    type: 'number' | 'text';
    placeholder?: string;
    options?: string[]; // 👈 추가된 부분
}

export const STEPS: StepInfo[] = [
    {
        title: '나이를 알려주세요',
        subtitle: '맞춤 식단을 추천해 드릴게요',
        field: 'userAge',
        type: 'number'
    },
    {
        title: '현재 질병이 있나요?',
        subtitle: '음식 추천에 반영할게요',
        field: 'disease',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요',
        options: ['당뇨', '대장암', '위암', '폐암', '아토피', '고혈압', '고지혈증', '협심증'] // 👈 질병 버튼 옵션
    },
    {
        title: '가족력이 있나요?',
        subtitle: '예방을 위한 식단을 추천해 드릴게요',
        field: 'familyHistory',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요',
        options: ['당뇨', '대장암', '위암', '폐암', '고혈압', '심장병', '뇌졸중', '치매'] // 👈 가족력 버튼 옵션
    },
    {
        title: '알레르기가 있나요?',
        subtitle: '안전한 식단을 추천해 드릴게요',
        field: 'allergy',
        type: 'text',
        placeholder: '없으시다면 \'없음\'이라고 입력해주세요',
        options: ['계란', '우유', '밀가루', '땅콩', '견과류', '새우', '꽃가루', '집먼지 진드기'] // 👈 알러지 버튼 옵션
    }
];