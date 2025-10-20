package com.project.service;

import com.project.entity.User;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {
    
    // 카카오 API 통신을 위한 WebClient 설정
    private final WebClient webClient = WebClient.builder()
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build(); 
            
    private final UserRepository userRepository;
    
    @Value("${KAKAO_KEY}") 
    private String kakaoKey;
    @Value("${KAKAO_REDIRECT_URL}")
    private String redirectUri;
    @Value("${KAKAO_TOKEN_URL}")
    private String tokenUri;
    @Value("${KAKAO_USER_INFO_URL}")
    private String userInfoUri;

    // 1. 인가 코드로 Kakao Access Token을 받기
    public String getKakaoAccessToken(String code) {
        
        // 1-1. 카카오 토큰 요청에 필요한 파라미터 구성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", kakaoKey);
        body.add("redirect_uri", redirectUri);
        body.add("code", code); 
        
        try {
            // 1-2. 카카오 토큰 API 호출 (POST 요청)
            Map<String, Object> tokenResponse = webClient.post()
                    .uri(tokenUri)
                    .bodyValue(body)
                    .retrieve()
                    // 1-3. 에러 발생 시 처리
                    .onStatus(status -> status.isError(), clientResponse -> {
                        log.error("Kakao Token API 에러 발생 : {}", clientResponse.statusCode());
                        return clientResponse.createException(); 
                    })
                    .bodyToMono(Map.class)
                    .block();
            
            // 1-4. Access Token 추출
            if (tokenResponse != null && tokenResponse.containsKey("access_token")) {
                return (String) tokenResponse.get("access_token");
            }
            return null;

        } catch (Exception e) {
            log.error("카카오로부터 Access Token을 받아오지 못하였습니다.", e);
            return null;
        }
    }

    // 2. Kakao Access Token으로 사용자 정보를 받아옵니다.
    public Map<String, Object> getKakaoUserInfo(String kakaoAccessToken) {
        
        try {
            // 2-1. 카카오 사용자 정보 API 호출
            Map<String, Object> userInfo = webClient.get()
                    .uri(userInfoUri)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessToken)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)                    .retrieve()
                    // 2-2. 에러 발생 시 처리
                    .onStatus(status -> status.isError(), clientResponse -> {
                        log.error("카카오 유저 정보 API 에러 발생 {}", clientResponse.statusCode());
                        return clientResponse.createException();
                    })
                    .bodyToMono(Map.class)
                    .block();
            
            return userInfo != null ? userInfo : Collections.emptyMap();

        } catch (Exception e) {
            log.error("유저 정보를 찾지 못했습니다.", e);
            return Collections.emptyMap();
        }
    }

    // 3. 사용자 정보를 바탕으로 DB에 저장하거나 조회
    @Transactional
    public User findOrCreateUser(Map<String, Object> userInfo) {
        String providerId = userInfo.get("id").toString();
        
        // 1. DB에서 카카오 ID로 기존 회원 조회
        return userRepository.findByProviderId(providerId)
            .orElseGet(() -> {
                // 2. 회원이 없으면 자동 회원가입
                Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
                String email = (String) kakaoAccount.get("email");
                String nickname = (String) ((Map<String, Object>) kakaoAccount.get("profile")).get("nickname");

                User newUser = User.createKakaoUser(email, nickname, providerId);
                return userRepository.save(newUser);
            });
    }
}