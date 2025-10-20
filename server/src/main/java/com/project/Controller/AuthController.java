package com.project.Controller;

import com.project.config.JwtTokenProvider;
import com.project.entity.User;
import com.project.service.OAuthService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 응답 DTO 정의 (프론트엔드와 동일해야 함)
class JwtResponse {
    public String accessToken;
    public String refreshToken;
}

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final OAuthService kakaoOAuthService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/kakao/callback")
    public ResponseEntity<JwtResponse> kakaoCallback(@RequestBody Map<String, String> requestBody) {
        
        // 1. 요청 본문(Body)에서 code 값 추출
        String code = requestBody.get("code");
        
        if (code == null) { return ResponseEntity.badRequest().build(); }
        
        // 2. 인가 코드로 카카오 액세스 토큰 획득
        String kakaoAccessToken = kakaoOAuthService.getKakaoAccessToken(code);
        
        // 3. 카카오 액세스 토큰으로 사용자 정보 획득
        Map<String, Object> userInfo = kakaoOAuthService.getKakaoUserInfo(kakaoAccessToken);

        // 4. 사용자 정보로 DB에서 조회/가입 처리 및 엔티티 획득 (자동 회원가입)
        User user = kakaoOAuthService.findOrCreateUser(userInfo);
        
        // 5. 서비스의 JWT 생성 및 반환 (Notion 링크 기반 구현)
        String accessToken = jwtTokenProvider.createAccessToken(user.getUserNum()); // userNum 기반
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUserNum()); 
        
        // 6. 프론트엔드로 응답
        JwtResponse response = new JwtResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        
        return ResponseEntity.ok(response);
    }
}