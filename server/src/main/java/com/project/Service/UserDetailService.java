package com.project.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.UserDetailDto.UserDetailRequest;
import com.project.dto.UserDetailDto.UserDetailResponse;
import com.project.entity.User;
import com.project.entity.UserDetail;
import com.project.repository.UserDetailRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailService {
    
    private final UserDetailRepository userDetailRepository; 
    private final UserRepository userRepository;

    // 유저 상세정보 찾기
    public UserDetailResponse getUserDetail(Long userNum){
        UserDetail userDetail = userDetailRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저의 상세정보가 없습니다."));

        return UserDetailResponse.fromEntity(userDetail);
    }

    // 유저 상세 정보 저장
    @Transactional
    public UserDetailResponse saveUserDetail(String userId, UserDetailRequest request){
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        UserDetail userDetail = UserDetail.builder()
            .user(user)
            .userAge(request.userAge())
            .disease(request.disease())
            .familyHistory(request.familyHistory())
            .allergy(request.allergy())
            .build();

        UserDetail save = userDetailRepository.save(userDetail);
        return UserDetailResponse.fromEntity(save);
    }

    // 유저 상세 정보 수정
    @Transactional
    public UserDetailResponse updateUserDetail(Long userNum, UserDetailRequest request){
        UserDetail userDetail = userDetailRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저의 상세 정보가 없습니다."));

        userDetail.update(request.userAge(), request.disease(), request.familyHistory(), request.allergy());
        return UserDetailResponse.fromEntity(userDetail);
    }
}
