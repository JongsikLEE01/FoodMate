package com.project.service;

import org.springframework.stereotype.Service;

import com.project.dto.UserDto.UserRequest;
import com.project.dto.UserDto.UserResponse;
import com.project.entity.User;
import com.project.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // 유저 정보 찾기
    public UserResponse getUser(Long userNum){
        User user = userRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));
        
        return UserResponse.fromEntity(user);
    }

    // 유저 코인 차감
    @Transactional
    public UserResponse decreaseUserCoin(Long userNum, UserRequest request){
        User user = userRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        user.decreaseCoin(1);

        return UserResponse.fromEntity(user);
    }

    // 유저 코인 증감
    @Transactional
    public UserResponse addUserCoin(Long userNum, int coin){
        User user = userRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        if(coin == 0){
            new IllegalArgumentException("0개의 코인은 충전할 수 없습니다.");
        }

        user.decreaseCoin(coin);

        return UserResponse.fromEntity(user);
    }
}
