package com.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.entity.ChatUserContext;
import com.project.entity.DietRule;
import com.project.repository.DietDataRepository;
import com.project.util.ChatUtil;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class ChatService {
    private final UserService userService;
    private final DietDataRepository dietDataRepository;
    private final AiService aiService;
    private final ObjectMapper objMapper;

    // Chat 답변 생성
    public String getChatResponse(Long UserNum, String msg) throws Exception {
        ChatUserContext userContext = userService.getChatUserContext(UserNum, msg);

        // 텍스트 추출
        List<String> keyword = ChatUtil.splitString(msg.toLowerCase().replace(" ", ","));
        List<String> jsonString = dietDataRepository.findJsonDataByDiseaseNameIn(userContext.diseases());

        // json 데이터로 답변 찾기
        DietRule matchRule = findJsonAnswer(userContext, keyword, jsonString);

        if(matchRule != null){
            return jsonAnswer(matchRule, userContext);
        } else {
            return aiService.callAi(userContext, msg);
        }
    }

    // JSON 데이터 중 답변이 있는지 확인
    private DietRule findJsonAnswer(ChatUserContext userContext, List<String> keyword, List<String> jsonStrings) throws Exception {
        List<DietRule> allRules = new ArrayList<>();
        for (String jsonStr : jsonStrings) {
            List<DietRule> rules = objMapper.readValue(jsonStr, new TypeReference<List<DietRule>>() {});
            allRules.addAll(rules);
        }

        for (DietRule rule : allRules) {
            // 키워드 매칭 체크
            boolean keywordChk = rule.triggerKw().stream().anyMatch(kw -> keyword.contains(kw.toLowerCase()));
            if (!keywordChk) continue;

            // 알러지/나이/질병 필터
            boolean allergyChk = rule.allergyEx().stream().anyMatch(allergy -> userContext.allergies().contains(allergy));
            if (allergyChk) continue;
            if (!rule.targetAge().equalsIgnoreCase("ALL") && !ageMatch(userContext.age(), rule.targetAge())) continue; 
            if (!rule.fhFilter().isEmpty()) {
                boolean isFhMatch = rule.fhFilter().stream().allMatch(fh -> userContext.familyHistory().contains(fh));
                if (!isFhMatch) continue;
            }
            return rule;
        }
        return null;
    }

    // JSON 답변 템플릿
    private String jsonAnswer(DietRule rule, ChatUserContext userContext){
        String answer = rule.answer();
        
        answer = answer.replace("${user_age}", String.valueOf(userContext.age()));
        answer = answer.replace("${REC_FOOD}", rule.recFood());

        String userFhString = userContext.familyHistory().stream()
                                     .collect(Collectors.joining(", "));
        
        answer = answer.replace("${가족_필터}", userFhString.isEmpty() ? "특별한 가족력" : userFhString);
        answer = answer.replace("${family_history_note}", userFhString.isEmpty() ? "" : String.format(" 고객님의 가족력(%s)을 고려하여...", userFhString));

        return answer;
    }

    // 나이 매칭
    private boolean ageMatch(int userAge, String targetAge) {
        try {
            if (targetAge.contains("-")) {
                String[] parts = targetAge.split("-");
                return userAge >= Integer.parseInt(parts[0]) && userAge <= Integer.parseInt(parts[1]);
            } else if (targetAge.contains("+")) {
                return userAge >= Integer.parseInt(targetAge.replace("+", ""));
            }
        } catch (NumberFormatException e) {
            return false;
        }
        return false;
    }
}
