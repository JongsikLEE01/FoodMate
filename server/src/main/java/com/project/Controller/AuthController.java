package com.project.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Service.UserService;
import com.project.Util.JwtTokenProvider;
import com.project.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")  
@RequiredArgsConstructor
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> body){
        String accessToken = body.get("accessToken");
        Map<String, Object> kakaoUser = userService.getKakaoUserInfo(accessToken);

        String kakaoId = kakaoUser.get("id").toString();
        String name = ((Map<String, Object>) kakaoUser.get("properties")).get("nickname").toString();

        // 사용자 생성 or 조회
        User user = userService.findOrCreate(kakaoId, name);
        // JWT 토큰 생성
        String token = jwtTokenProvider.createToken(user.getUserId());

        return ResponseEntity.ok(Map.of("token", token, "user", user));
    }
}
