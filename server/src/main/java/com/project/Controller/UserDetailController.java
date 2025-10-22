package com.project.Controller;

import com.project.entity.User;
import com.project.entity.UserDetail;
import com.project.repository.UserRepository;
import com.project.repository.UserDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserDetailController {

    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    @PostMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDetail userDetailRequest, Authentication authentication) {
        Long userNum = Long.parseLong(authentication.getName());
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetail userDetail = new UserDetail();
        userDetail.setUser(user);
        userDetail.setUserAge(userDetailRequest.getUserAge());
        userDetail.setDisease(userDetailRequest.getDisease());
        userDetail.setFamilyHistory(userDetailRequest.getFamilyHistory());
        userDetail.setAllergy(userDetailRequest.getAllergy());

        user.setUserDetail(userDetail);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDetail> getUserProfile(Authentication authentication) {
        Long userNum = Long.parseLong(authentication.getName());
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetail userDetail = user.getUserDetail();
        if (userDetail == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDetail);
    }
}