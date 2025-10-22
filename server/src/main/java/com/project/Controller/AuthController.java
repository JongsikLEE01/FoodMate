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

class JwtResponse {
    public String accessToken;
    public String refreshToken;
    public boolean isNewUser;
    public UserInfo userInfo;
}

class UserInfo {
    public Long userNum;
    public String userId;
    public Integer userAge;
    public String disease;
    public String familyHistory;
    public String allergy;
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
        
        System.out.println("JWT 토큰 생성 완료 - User: " + user.getUserNum());
        
        // 6. 프론트엔드로 응답
        JwtResponse response = new JwtResponse();
        response.accessToken = accessToken;
        response.refreshToken = refreshToken;
        
        // 신규 사용자 여부 확인 (UserDetail이 없으면 신규 사용자로 간주)
        boolean isNewUser = user.getUserDetail() == null;
        
        response.isNewUser = isNewUser;
        
        // 사용자 정보 추가
        UserInfo userDetailInfo = new UserInfo();
        userDetailInfo.userNum = user.getUserNum();
        userDetailInfo.userId = user.getUserId();
        
        // UserDetail에서 정보 가져오기
        if (user.getUserDetail() != null) {
            userDetailInfo.userAge = user.getUserDetail().getUserAge();
            userDetailInfo.disease = user.getUserDetail().getDisease();
            userDetailInfo.familyHistory = user.getUserDetail().getFamilyHistory();
            userDetailInfo.allergy = user.getUserDetail().getAllergy();
        }
        
        response.userInfo = userDetailInfo;
        
        System.out.println("로그인 응답 전송 - Access Token: " + accessToken.substring(0, 10) + "... isNewUser: " + isNewUser);
        
        return ResponseEntity.ok(response);
    }
}