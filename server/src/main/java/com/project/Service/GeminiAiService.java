package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.project.dto.GeminiDto.Config;
import com.project.dto.GeminiDto.Content;
import com.project.dto.GeminiDto.GeminiRequest;
import com.project.dto.GeminiDto.GeminiResponse;
import com.project.dto.GeminiDto.Part;
import com.project.entity.ChatUserContext;

@Service
public class GeminiAiService implements AiService {

    private final WebClient webClient;
    private final String geminiApiKey;
    private static final String MODEL_NAME = "gemini-2.5-flash";

    // API 키 주입
    public GeminiAiService(WebClient.Builder webClientBuilder, @Value("${gemini.api.key}") String apiKey, @Value("${gemini.api.url}") String apiUrl){
        this.geminiApiKey = apiKey;
        this.webClient = webClientBuilder.baseUrl(apiUrl).defaultHeader("Content-Type", "application/json").build();
    }

    // gemini 호출
    @Override
    public String callAi(ChatUserContext userContext, String msg) {
        // 프롬프트 및 문맥 준비
        String contextString = buildUserContent(userContext);
        String userData = String.format("당신은 맞춤형 식단 추천 AI 푸드메이트입니다. %s 이 정보를 바탕으로 사용자의 질문에 친절하고 유용한 식단 조언을 한국어로 200자 이내로 의학적 지식에 기반해 간결하게 제공하세요.", contextString);
        String aiPrompt = userData + "\n\n" + "사용자의 질문 : " + msg;

        // 메세지 본문 생성
        GeminiRequest req = new GeminiRequest(
            List.of(
                new Content("user", List.of(new Part(aiPrompt)))
            ),
            new Config(0.8)
        );

         // WebClient를 사용하여 Gemini API 호출
        try {
            // API 경로, 모델, API 키 포함하여 호출
            GeminiResponse res = webClient.post().uri("/{model}:generateContent?key={apiKey}", MODEL_NAME, geminiApiKey) 
                                          .body(BodyInserters.fromValue(req))
                                          .retrieve()
                                          .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(), clientResponse -> {
                                              return clientResponse.bodyToMono(String.class).map(body -> new RuntimeException("Gemini API 호출 실패: " + body));
                                          })
                                          .bodyToMono(GeminiResponse.class)
                                          .block();
            
            // 응답 파싱 및 반환(첫 번째 후보의 텍스트 응답을 추출)
            if (res != null && res.candidates() != null && !res.candidates().isEmpty()) {
                return res.candidates().get(0).content().parts().get(0).text();
            }
            
            return "죄송합니다. AI 응답을 생성할 수 없습니다. 잠시 후 다시 시도해주세요.";
            
        } catch (Exception e) {
            System.err.println("Gemini API 호출 중 예상치 못한 오류 발생: " + e.getMessage());
            return "AI 서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
        }
    }


    // 사용자 정보 가져오기
    public String buildUserContent(ChatUserContext userContext) {
        Integer userAge = userContext.age();
        String userDiseases = userContext.diseases().stream().collect(Collectors.joining(", "));
        String userAllergies = userContext.allergies().stream().collect(Collectors.joining(", "));
        String userFamilyHistory = userContext.familyHistory().stream().collect(Collectors.joining(", "));

        String data = String.format(
            "고객님은 나이(%d), 보유 질병(%s), 가족력(%s), 알러지(%s)를 고려해야합니다.", 
            userAge,
            userDiseases.isEmpty() ? "없음" : userDiseases,
            userFamilyHistory.isBlank() ? "없음" : userFamilyHistory,
            userAllergies.isEmpty() ? "없음" : userAllergies
        );

        return data;
    }
}
