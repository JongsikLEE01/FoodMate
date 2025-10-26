package com.project.Controller;

import com.project.dto.UserDetailDto.UserDetailRequest;
import com.project.dto.UserDetailDto.UserDetailResponse;
import com.project.service.UserDetailService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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
    @GetMapping
    public ResponseEntity<UserDetailResponse> getUserDetail(Authentication auth) {
        Long userNum = Long.parseLong(auth.getName());
        UserDetailResponse res = userDetailService.getUserDetail(userNum);

        return ResponseEntity.ok(res);
    }

    /**
     * 유저 디테일 생성/수정
     * @param request
     * @param auth
     * @return
     */
    @PostMapping
    public ResponseEntity<UserDetailResponse> createUserDetail(@Validated @RequestBody UserDetailRequest request, Authentication auth){
        Long userNum = Long.parseLong(auth.getName());

        // Request의 userNum과 인증된 userNum이 다를 경우 예외 처리
        if (!userNum.equals(request.userNum())) {
            throw new AccessDeniedException("해당 권한이 없습니다.");
        }

        UserDetailResponse res = userDetailService.saveUserDetail(request);

        return ResponseEntity.ok(res);
    }
}