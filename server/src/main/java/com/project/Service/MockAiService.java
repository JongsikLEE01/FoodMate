package com.project.service;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.entity.ChatUserContext;

@Service
public class MockAiService implements AiService {
    
    @Override
    public String callAi(ChatUserContext userContext, String msg) {
        // https://rudaks.tistory.com/entry/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8-gemini-api-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0#google_vignette
        String userDiseases = userContext.diseases().stream().collect(Collectors.joining(", "));
        String userAllergies = userContext.allergies().stream().collect(Collectors.joining(", "));
        String userFamilyHistory = userContext.familyHistory().stream().collect(Collectors.joining(", "));

        String data = String.format(
            "고객님의 나이, 보유 질병(%s), 가족력(%s), 알러지(%s)를 고려하여 AI가 답변합니다.", 
            userDiseases.isEmpty() ? "없음" : userDiseases,
            userFamilyHistory.isBlank() ? "없음" : userFamilyHistory,
            userAllergies.isEmpty() ? "없음" : userAllergies
        );

        return data;
    }
}
