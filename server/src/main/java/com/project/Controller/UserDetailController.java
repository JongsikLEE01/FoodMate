package com.project.Controller;

import com.project.dto.UserDetailDto.UserDetailRequest;
import com.project.dto.UserDetailDto.UserDetailResponse;
import com.project.service.UserDetailService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/profile")
@RequiredArgsConstructor
public class UserDetailController {

    private final UserDetailService userDetailService;

    /**
     * 유저 디테일 찾기
     * @param auth
     * @return
     */
    @GetMapping("/{userNum}")
    public ResponseEntity<UserDetailResponse> getUserDetail(Authentication auth) {
        Long userNum = Long.parseLong(auth.getName());

        return ResponseEntity.ok(userDetailService.getUserDetail(userNum));
    }

    /**
     * 유저 디테일 생성
     * @param request
     * @param auth
     * @return
     */
    @PostMapping
    public ResponseEntity<UserDetailResponse> createUserDetail(@Validated @RequestBody UserDetailRequest request, Authentication auth){
        String userId = String.valueOf(auth.getName());
        
        return ResponseEntity.ok(userDetailService.saveUserDetail(userId, request));
    }
    
    /**
     * 유저 디테일 수정
     * @param request
     * @param auth
     * @return
     */
    @PatchMapping
    public ResponseEntity<UserDetailResponse> uploadUserDetail(@Validated @RequestBody UserDetailRequest request, Authentication auth){
        Long userNum = Long.parseLong(auth.getName());

        return ResponseEntity.ok(userDetailService.updateUserDetail(userNum, request));
    }
}