package com.project.Controller;

import java.util.Map;

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

    @PostMapping("/kakao")
    public Map<String, String> kakaoLogin(@RequestBody Map<String, String> request) {
        String accessToken = request.get("accessToken");
        String jwt = userService.loginWithKakao(accessToken);

        return Map.of("token", jwt);
    }
}
