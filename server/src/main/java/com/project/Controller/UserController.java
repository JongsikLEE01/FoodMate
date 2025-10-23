package com.project.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.UserDto.UserResponse;
import com.project.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    /**
     * 유저 정보 찾기
     * @param auth
     * @return
     */
    @GetMapping
    public ResponseEntity<UserResponse> getUser(Authentication auth) {
        Long userNum = Long.parseLong(auth.getName());
        
        return ResponseEntity.ok(userService.getUser(userNum));
    }
    
}
