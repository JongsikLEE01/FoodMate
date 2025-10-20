package com.project.Service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.Repository.UserRepository;
import com.project.entity.User;


import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${KAKAO_KEY}")
    private String kakaoKey;

    // 카카오 사용자 정보 조회
    public Map<String, Object> getKakaoUserInfo(String accessToken) {
        String url = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        Map.class
        )
        ;
        return response.getBody();
    }

    public User findOrCreate(String kakaoId, String name) {
        return userRepository.findByKakaoId(kakaoId)
                .orElseGet(() -> userRepository.save(User.builder()
                        .userId(kakaoId)
                        .userName(name)
                        .userPw("kakao") // placeholder
                        .coin(0)
                        .build()));
    }
}
