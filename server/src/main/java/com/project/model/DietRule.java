package com.project.model;

import java.util.List;

public record DietRule(
    Long ruleId,                // json 데이터 번호
    String targetAge,           // 대상 연령
    List<String> triggerKw,     // 질문 키워드
    List<String> allergyEx,     // 알러지 제외 필터
    List<String> fhFilter,      // 가족력 필터
    String recFood,             // 추천 음식
    String answer               // 답변 템플릿
) {
}
