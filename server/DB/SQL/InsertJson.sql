delete from diet_data;

commit;

-- 비만
INSERT INTO DIET_DATA (DISEASE_NAME, DATA_JSON) VALUES
('비만', JSON_ARRAY(
    -- 1. 고단백 아침 식단
    JSON_OBJECT('RULE_ID', 1, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('아침', '다이어트', '포만감'), 'ALLERGY_EX', JSON_ARRAY('계란', '우유'), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '삶은 계란, 두부 스크램블, 블랙커피', 'ANSWER', '체중 감량을 위해 ${user_age} 고객님께는 포만감을 오래 유지하는 고단백 ${REC_FOOD} 아침 식단을 권장합니다.'),
    -- 2. 식사 속도 조절
    JSON_OBJECT('RULE_ID', 2, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('빨리', '습관', '천천히'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '식사 시간 최소 20분', 'ANSWER', '뇌가 포만감을 인지하는 데 20분이 걸립니다. ${REC_FOOD} 동안 천천히 씹어 드세요. ${family_history_note}'),
    -- 3. 고강도 운동 후 간식
    JSON_OBJECT('RULE_ID', 3, 'TARGET_AGE', '20-40', 'TRIGGER_KW', JSON_ARRAY('운동 후', '단백질', '간식'), 'ALLERGY_EX', JSON_ARRAY('유청'), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '그릭 요거트, 닭가슴살 샐러드', 'ANSWER', '격렬한 운동 후 근육 회복을 위해 ${REC_FOOD}와 같은 양질의 단백질 섭취가 필요합니다.'),
    -- 4. 설탕/단순당 피하기
    JSON_OBJECT('RULE_ID', 4, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('설탕', '음료수', '간식'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '제로 칼로리 음료, 물', 'ANSWER', '체중 감량의 핵심은 단순당 배제입니다. 설탕이 포함된 음료 대신 ${REC_FOOD}를 선택하세요.'),
    -- 5. 섬유질 섭취 (중년 이상)
    JSON_OBJECT('RULE_ID', 5, 'TARGET_AGE', '40+', 'TRIGGER_KW', JSON_ARRAY('섬유소', '포만감', '소화'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '잡곡밥, 콩류, 채소', 'ANSWER', '${user_age} 고객님은 신진대사가 느려집니다. ${REC_FOOD} 섭취로 포만감을 높이고 배변 활동을 활발하게 하세요.'),
    -- 6. 외식 메뉴 선택
    JSON_OBJECT('RULE_ID', 6, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('외식', '메뉴', '점심'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '찜, 구이 위주 선택 (튀김, 볶음 제외)', 'ANSWER', '외식 시에는 칼로리가 높은 소스나 튀김 대신 ${REC_FOOD} 요리를 드시는 것이 좋습니다.'),
    -- 7. 야식 조절
    JSON_OBJECT('RULE_ID', 7, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('야식', '저녁', '배고픔'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY('당뇨'), 'REC_FOOD', '취침 3시간 전 금식', 'ANSWER', '체중 증가의 주범인 야식은 ${REC_FOOD}을 원칙으로 하세요. 특히 ${가족_필터} 가족력이 있다면 철저한 관리가 필요합니다.'),
    -- 8. 물 섭취 중요성
    JSON_OBJECT('RULE_ID', 8, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('물', '수분', '해독'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '하루 2리터의 물', 'ANSWER', '다이어트 중에는 ${REC_FOOD}을 마셔 노폐물 배출과 신진대사 활성화를 도와야 합니다.'),
    -- 9. 간헐적 단식 주의 (청년)
    JSON_OBJECT('RULE_ID', 9, 'TARGET_AGE', '20-40', 'TRIGGER_KW', JSON_ARRAY('단식', '간헐적', '시간'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '12~16시간 단식', 'ANSWER', '간헐적 단식을 시도하는 ${user_age} 고객님께는 ${REC_FOOD} 내에서 안전하게 진행하는 것을 권장합니다.'),
    -- 10. 포션 크기 조절
    JSON_OBJECT('RULE_ID', 10, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('양조절', '배불리', '포션'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '작은 접시 사용', 'ANSWER', '식사량을 줄이는 시각적 효과를 위해 ${REC_FOOD}에 담아 드시는 습관을 들여보세요.'),
    -- 11. 폭식 방지 전략
    JSON_OBJECT('RULE_ID', 11, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('폭식', '스트레스', '식탐'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '식사 전 물 한 컵', 'ANSWER', '감정적인 폭식을 막기 위해 식사 전 ${REC_FOOD}을 마시거나 양치질을 해 식욕을 억제하세요.'),
    -- 12. 탄수화물 제한 시간 (저녁)
    JSON_OBJECT('RULE_ID', 12, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('저녁', '밤', '탄수화물'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '저녁 7시 이후 탄수화물 섭취 제한', 'ANSWER', '늦은 시간의 탄수화물은 지방으로 쉽게 저장됩니다. ${REC_FOOD}이 체중 감량에 유리합니다.'),
    -- 13. 다이어트 시 단백질 목표
    JSON_OBJECT('RULE_ID', 13, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('단백질', '근육', '지방'), 'ALLERGY_EX', JSON_ARRAY('콩'), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '체중당 1.2g 이상', 'ANSWER', '체중 감량 중 근육 손실을 막기 위해 ${REC_FOOD} 단백질을 꾸준히 섭취해야 합니다.')
));
-- 당뇨
INSERT INTO DIET_DATA (DISEASE_NAME, DATA_JSON) VALUES
('당뇨', JSON_ARRAY(
    -- 11. GI 낮은 탄수화물
    JSON_OBJECT('RULE_ID', 14, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('탄수화물', '밥', 'GI'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '현미밥, 통곡물 빵', 'ANSWER', '혈당 스파이크를 막기 위해 백미 대신 ${REC_FOOD} 등 혈당지수(GI)가 낮은 탄수화물을 섭취하세요.'),
    -- 12. 식후 혈당 조절 팁
    JSON_OBJECT('RULE_ID', 15, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('식후', '혈당', '높음'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '식후 10분 가벼운 걷기', 'ANSWER', '식후 혈당 상승이 걱정될 때 ${REC_FOOD}는 혈당 조절에 매우 효과적인 방법입니다.'),
    -- 13. 저혈당 응급 처치 (15-15 원칙)
    JSON_OBJECT('RULE_ID', 16, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('저혈당', '응급', '대처'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '단순당 15g 섭취 후 15분 대기', 'ANSWER', '저혈당 증상이 나타나면 ${REC_FOOD}의 15-15 원칙을 따르세요. 사탕 3~4개나 주스 반 컵이 적당합니다.'),
    -- 14. 간식 추천 (지연성 흡수)
    JSON_OBJECT('RULE_ID', 17, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('간식', '추천', '배고픔'), 'ALLERGY_EX', JSON_ARRAY('견과류'), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '견과류, 방울토마토', 'ANSWER', '공복 시 혈당 유지를 위해 ${REC_FOOD}처럼 지방과 단백질이 포함된 간식을 소량 드세요.'),
    -- 15. 채소 우선 섭취
    JSON_OBJECT('RULE_ID', 18, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('식사 순서', '채소', '야채'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '채소 → 단백질 → 탄수화물 순', 'ANSWER', '혈당 흡수 속도를 늦추기 위해 식사 시 ${REC_FOOD}으로 드시는 것을 권장합니다.'),
    -- 16. 알코올 섭취 제한
    JSON_OBJECT('RULE_ID', 19, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('술', '알코올', '와인'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY('당뇨'), 'REC_FOOD', '금주 또는 남성 2잔/여성 1잔 이하', 'ANSWER', '알코올은 저혈당을 유발할 수 있습니다. ${가족_필터} 가족력을 가진 ${user_age} 고객님은 ${REC_FOOD}을 지켜야 합니다.'),
    -- 17. 지방 섭취 조언
    JSON_OBJECT('RULE_ID', 20, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('지방', '기름', '튀김'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '트랜스지방, 포화지방 제한', 'ANSWER', '인슐린 저항성을 높이는 ${REC_FOOD} 섭취는 최소화해야 합니다.'),
    -- 18. 식사 대체재 (60대 이상)
    JSON_OBJECT('RULE_ID', 21, 'TARGET_AGE', '60+', 'TRIGGER_KW', JSON_ARRAY('대체식', '식사', '간편'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '당뇨 환자용 영양 보충 음료', 'ANSWER', '${user_age} 노년층 고객님은 식사 대용으로 ${REC_FOOD}를 활용할 수 있습니다.'),
    -- 19. 과일 섭취 조언
    JSON_OBJECT('RULE_ID', 22, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('과일', '달콤', '당분'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '하루 1~2회, 통째로 섭취', 'ANSWER', '과일은 영양소가 풍부하지만, ${REC_FOOD}로 섭취하는 것이 당 조절에 유리합니다.'),
    -- 20. 가공식품 경고
    JSON_OBJECT('RULE_ID', 23, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('가공식품', '레토르트', '간편'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '나트륨과 숨겨진 설탕 확인', 'ANSWER', '가공식품을 선택할 때는 ${REC_FOOD}을 반드시 확인하고 드세요.'),
    -- 34. 통곡물과 백미 대체
    JSON_OBJECT('RULE_ID', 24, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('흰쌀', '백미', '통곡물'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '귀리, 보리, 현미', 'ANSWER', '흰쌀밥 대신 혈당지수(GI)가 낮은 ${REC_FOOD} 등 통곡물로 대체하여 식이섬유를 늘리세요.'),
    -- 35. 오메가-3 섭취
    JSON_OBJECT('RULE_ID', 25, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('생선', '오메가', '심장'), 'ALLERGY_EX', JSON_ARRAY('생선'), 'FH_FILTER', JSON_ARRAY('심장병'), 'REC_FOOD', '고등어, 연어, 치아시드', 'ANSWER', '${가족_필터} 가족력이 있다면 ${REC_FOOD}와 같이 오메가-3 지방산이 풍부한 식품 섭취를 늘려 심혈관 건강을 보호해야 합니다.'),
    -- 36. 짠 음식 제한 (혈압 동시 관리)
    JSON_OBJECT('RULE_ID', 26, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('나트륨', '짠', '국'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '하루 소금 5g (나트륨 2000mg)', 'ANSWER', '당뇨 환자는 고혈압 위험도 높으므로 ${REC_FOOD} 이하로 염분 섭취를 줄이는 것이 좋습니다.')
));

-- 고혈압
INSERT INTO DIET_DATA (DISEASE_NAME, DATA_JSON) VALUES
('고혈압', JSON_ARRAY(
    -- 21. DASH 식단의 원칙
    JSON_OBJECT('RULE_ID', 28, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('DASH', '저염', '식단'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '저지방 유제품, 통곡물, 채소/과일', 'ANSWER', '혈압 강하에 효과적인 DASH 식단의 기본은 ${REC_FOOD}을 늘리는 것입니다.'),
    -- 22. 칼륨/마그네슘 섭취
    JSON_OBJECT('RULE_ID', 29, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('칼륨', '마그네슘', '미네랄'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '바나나, 시금치, 콩, 견과류', 'ANSWER', '나트륨 배출을 돕는 ${REC_FOOD}를 충분히 섭취하세요.'),
    -- 23. 나트륨 목표 설정
    JSON_OBJECT('RULE_ID', 30, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('나트륨', '소금', '염분'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '하루 2,000mg 이하', 'ANSWER', '고혈압 환자의 나트륨 섭취 목표는 ${REC_FOOD} 이하입니다.'),
    -- 24. 가공육 및 캔류 제한
    JSON_OBJECT('RULE_ID', 31, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('가공육', '햄', '통조림'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '나트륨 함량이 높은 가공육 및 통조림 식품', 'ANSWER', '고혈압 관리를 위해 ${REC_FOOD} 섭취는 최소화해야 합니다.'),
    -- 25. 외식 시 저염 조언
    JSON_OBJECT('RULE_ID', 32, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('외식', '식당', '국물'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '국물 최소화, 소스는 따로 요청', 'ANSWER', '외식 시에는 ${REC_FOOD}을 통해 염분 섭취를 의식적으로 줄여야 합니다.'),
    -- 26. 올리브 오일 활용
    JSON_OBJECT('RULE_ID', 33, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('기름', '오일', '좋은'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '엑스트라 버진 올리브 오일', 'ANSWER', '단일 불포화 지방산이 풍부한 ${REC_FOOD}은 혈압 안정에 도움을 줍니다.'),
    -- 27. 커피/카페인 제한
    JSON_OBJECT('RULE_ID', 34, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('커피', '카페인', '에너지'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '하루 2잔 이하 (고혈압 수치 높다면 금지)', 'ANSWER', '카페인은 일시적으로 혈압을 상승시킬 수 있습니다. ${REC_FOOD} 섭취를 조절하세요.'),
    -- 28. 가족력 기반 아침 (40대 이상)
    JSON_OBJECT('RULE_ID', 35, 'TARGET_AGE', '40+', 'TRIGGER_KW', JSON_ARRAY('아침', '식단', '가족력'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY('심장병', '뇌졸중'), 'REC_FOOD', '견과류 없는 저염 통곡물 시리얼', 'ANSWER', '${user_age} 고객님은 ${가족_필터} 가족력이 있어 아침 ${REC_FOOD} 선택이 중요합니다.'),
    -- 29. 사탕수수 및 포도당 제한
    JSON_OBJECT('RULE_ID', 36, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('설탕', '당분', '과당'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '고과당 시럽이 들어간 음료와 스낵', 'ANSWER', '과도한 당분은 혈압 상승과 관련이 있습니다. ${REC_FOOD} 섭취를 최소화하세요.'),
    -- 30. 알코올 혈압 관계
    JSON_OBJECT('RULE_ID', 37, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('술', '맥주', '소주'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '과도한 음주는 혈압을 높입니다', 'ANSWER', '${REC_FOOD}. 혈압약을 복용 중이라면 전문의와 상담 후 섭취량을 조절해야 합니다.'),
    -- 37. 가공식품 라벨 확인
    JSON_OBJECT('RULE_ID', 38, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('가공', '식품', '라벨'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '영양 성분표의 나트륨 함량', 'ANSWER', '포장된 식품을 구매할 때는 ${REC_FOOD}을 반드시 확인하여 나트륨 섭취를 조절하세요.'),
    -- 38. 유산소 운동 병행 (40대 이상)
    JSON_OBJECT('RULE_ID', 39, 'TARGET_AGE', '40+', 'TRIGGER_KW', JSON_ARRAY('운동', '혈압', '스트레스'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '주 5일, 30분 이상 유산소 운동', 'ANSWER', '${user_age} 고객님은 약물 치료와 병행하여 ${REC_FOOD}을 꾸준히 실천하면 혈압 강하 효과를 볼 수 있습니다.'),
    -- 39. 지방 종류 선택
    JSON_OBJECT('RULE_ID', 30, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('지방', '포화', '불포화'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '아보카도, 견과류, 등푸른 생선', 'ANSWER', '혈관 건강을 위해 트랜스 지방과 포화 지방 대신 ${REC_FOOD}와 같은 불포화 지방을 섭취하세요.'),
    -- 40. 염분 대체재 활용
    JSON_OBJECT('RULE_ID', 41, 'TARGET_AGE', 'ALL', 'TRIGGER_KW', JSON_ARRAY('싱겁게', '짠맛', '조미료'), 'ALLERGY_EX', JSON_ARRAY(), 'FH_FILTER', JSON_ARRAY(), 'REC_FOOD', '허브, 후추, 마늘, 양파', 'ANSWER', '음식을 싱겁게 먹기 어렵다면 소금 대신 ${REC_FOOD} 등 천연 재료로 풍미를 더하세요.')
));