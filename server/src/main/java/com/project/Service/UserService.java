package com.project.Service;

import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.Repository.UserRepository;
import com.project.Util.JwtTokenProvider;
import com.project.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RestTemplate restTemplate = new RestTemplate();

    public String loginWithKakao(String kakaoAccessToken) {
        // 1. 카카오 API 호출
        String url = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(kakaoAccessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map kakaoUser = response.getBody();

        String userId = kakaoUser.get("id").toString();
        Map kakaoAccount = (Map) kakaoUser.get("kakao_account");
        String name = ((Map) kakaoAccount.get("profile")).get("nickname").toString();

        // 2. 회원가입 or 로그인
        User user = userRepository.findByKakaoId(userId)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUserId(userId);
                    newUser.setUserName(name);
                    return userRepository.save(newUser);
                });

        // 3. JWT 발급
        return jwtTokenProvider.createToken(user.getUserId());
    }
}
