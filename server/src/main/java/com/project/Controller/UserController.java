package com.project.Controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Value("${KAKAO_KEY}")
    private String kakaoKey;

    // Kakao 로그인
    @PostMapping("/kakao")
    public ResponseEntity<String> kakaoLogin(@RequestBody Map<String, String> request) {
        String accessToken = request.get("accessToken");
        String jwt = userService.loginWithKakao(accessToken);
        return ResponseEntity.ok(jwt);
    }
    
}
