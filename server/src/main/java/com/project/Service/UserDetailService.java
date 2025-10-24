package com.project.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.UserDetailDto.UserDetailRequest;
import com.project.dto.UserDetailDto.UserDetailResponse;
import com.project.entity.User;
import com.project.entity.UserDetail;
import com.project.repository.UserDetailRepository;
import com.project.repository.UserRepository;

import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    
    private final UserDetailRepository userDetailRepository; 
    private final UserRepository userRepository; 

    // 유저 상세 정보 조회
    @Transactional
    @PermitAll
    public UserDetailResponse getUserDetail(Long userNum) {
        return userDetailRepository.findByUserNum(userNum)
            .map(UserDetailResponse::fromEntity)
            .orElse(new UserDetailResponse(null, null, null, null, null));
    }



    // 유저 상세 정보 저장/수정
    @Transactional
    public UserDetailResponse saveUserDetail(UserDetailRequest request) {
        Long userNum = Long.valueOf(request.userNum());

        // User 존재 확인
        User user = userRepository.findById(userNum)
                .orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다"));

        UserDetail detail = userDetailRepository.findByUserNum(userNum)
                .map(existing -> existing.update(request))  // update
                .orElseGet(() -> {
                    // 새 객체 생성 시 반드시 User 연결
                    UserDetail newDetail = UserDetail.builder()
                            .user(user)
                            .userAge(request.userAge())
                            .disease(request.disease())
                            .familyHistory(request.familyHistory())
                            .allergy(request.allergy())
                            .build();
                    return userDetailRepository.save(newDetail);
                });

        return UserDetailResponse.fromEntity(detail);
    }

}
