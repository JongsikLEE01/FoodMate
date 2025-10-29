package com.project.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DietRule(
    @JsonProperty("RULE_ID")
    Long ruleId,                // json 데이터 번호
    @JsonProperty("TARGET_AGE")
    String targetAge,           // 대상 연령
    @JsonProperty("TRIGGER_KW")
    List<String> triggerKw,     // 질문 키워드
    @JsonProperty("ALLERGY_EX")
    List<String> allergyEx,     // 알러지 제외 필터
    @JsonProperty("FH_FILTER")
    List<String> fhFilter,      // 가족력 필터
    @JsonProperty("REC_FOOD")
    String recFood,             // 추천 음식
    @JsonProperty("ANSWER")
    String answer               // 답변 템플릿
) {
}
