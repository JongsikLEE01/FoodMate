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
import org.springframework.web.reactive.function.BodyInserters;
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
    // Optional client secret (leave empty if not configured in Kakao app)
    @Value("${KAKAO_SECRET:}")
    private String kakaoSecret;
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
        if (kakaoSecret != null && !kakaoSecret.isBlank()) {
            body.add("client_secret", kakaoSecret);
        }
        
        try {
            // 1-2. 카카오 토큰 API 호출 (POST 요청)
            Map<String, Object> tokenResponse = webClient.post()
                    .uri(tokenUri)
                    // send as application/x-www-form-urlencoded
                    .body(BodyInserters.fromFormData(body))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            
            // 1-4. Access Token 추출
            if (tokenResponse != null && tokenResponse.containsKey("access_token")) {
                return (String) tokenResponse.get("access_token");
            }
            return null;
        } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {
            // 서버가 반환한 바디(에러 상세)를 로깅하면 원인 파악에 도움됩니다.
            log.error("카카오 토큰 요청 실패: status={}, body={}", e.getRawStatusCode(), e.getResponseBodyAsString());
            return null;
        } catch (Exception e) {
            log.error("카카오로부터 Access Token을 받아오지 못하였습니다.", e);
            return null;
        }
    }

    // 2. Kakao Access Token으로 사용자 정보를 받아옵니다.
    @SuppressWarnings("unchecked")
    public Map<String, Object> getKakaoUserInfo(String kakaoAccessToken) {
        if (kakaoAccessToken == null || kakaoAccessToken.isBlank()) {
            log.error("카카오 액세스 토큰이 null이거나 비어있습니다.");
            return Collections.emptyMap();
        }
        
        log.info("카카오 사용자 정보 요청 시작 - 토큰: {}", kakaoAccessToken.substring(0, Math.min(10, kakaoAccessToken.length())) + "...");
        
        try {
            // 2-1. 카카오 사용자 정보 API 호출
            Map<String, Object> userInfo = webClient.get()
                    .uri(userInfoUri)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessToken)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .retrieve()
                    // 2-2. 에러 발생 시 처리
                    .onStatus(status -> status.isError(), clientResponse -> {
                        log.error("카카오 유저 정보 API 에러 발생: status={}, uri={}", 
                            clientResponse.statusCode(), userInfoUri);
                        return clientResponse.bodyToMono(String.class)
                            .flatMap(error -> {
                                log.error("카카오 에러 상세: {}", error);
                                return clientResponse.createException();
                            });
                    })
                    .bodyToMono(Map.class)
                    .block();
            
            if (userInfo == null || userInfo.isEmpty()) {
                log.error("카카오로부터 받은 사용자 정보가 비어있습니다.");
                return Collections.emptyMap();
            }
            
            log.info("카카오 사용자 정보 요청 성공 - ID: {}", userInfo.get("id"));
            return userInfo;

        } catch (Exception e) {
            log.error("유저 정보를 찾지 못했습니다.", e);
            return Collections.emptyMap();
        }
    }

    // 3. 사용자 정보를 바탕으로 DB에 저장하거나 조회
    @SuppressWarnings("unchecked")
    @Transactional
    public User findOrCreateUser(Map<String, Object> userInfo) {
        if (userInfo == null || !userInfo.containsKey("id")) {
            log.error("유효하지 않은 카카오 사용자 정보입니다: {}", userInfo);
            throw new IllegalArgumentException("카카오 사용자 정보가 유효하지 않습니다");
        }

        String providerId = String.valueOf(userInfo.get("id")); // toString() 대신 안전한 변환
        log.info("카카오 사용자 정보 처리 중 - Provider ID: {}", providerId);
        
        // 1. DB에서 카카오 ID로 기존 회원 조회
        return userRepository.findByProviderId(providerId)
            .orElseGet(() -> {
                try {
                    log.info("신규 사용자 등록 시작 - Provider ID: {}", providerId);
                    // 2. 회원이 없으면 자동 회원가입
                    Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
                    if (kakaoAccount == null) {
                        log.error("kakao_account 정보 누락 - Provider ID: {}", providerId);
                        throw new IllegalArgumentException("kakao_account 정보가 없습니다");
                    }

                    Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                    if (profile == null) {
                        log.error("프로필 정보 누락 - Provider ID: {}", providerId);
                        throw new IllegalArgumentException("프로필 정보가 없습니다");
                    }

                    String email = kakaoAccount.containsKey("email") ? (String) kakaoAccount.get("email") : "unknown@email.com";
                    String nickname = profile.containsKey("nickname") ? (String) profile.get("nickname") : "Unknown User";
                    log.info("사용자 정보 추출 완료 - Email: {}, Nickname: {}", email, nickname);

                    User newUser = User.createKakaoUser(email, nickname, providerId);
                    return userRepository.save(newUser);
                } catch (Exception e) {
                    log.error("사용자 생성 중 오류 발생: {}", e.getMessage(), e);
                    throw new IllegalArgumentException("사용자 생성에 실패했습니다: " + e.getMessage());
                }
            });
    }
}