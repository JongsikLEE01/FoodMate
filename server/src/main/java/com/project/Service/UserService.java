package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.UserDto.UserRequest;
import com.project.dto.UserDto.UserResponse;
import com.project.entity.ChatUserContext;
import com.project.entity.User;
import com.project.entity.UserDetail;
import com.project.repository.UserDetailRepository;
import com.project.repository.UserRepository;
import com.project.util.ChatUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    // userContext 생성
    public ChatUserContext getChatUserContext(Long userNum, String msg) {
        UserDetail userDetail = userDetailRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저의 상세 정보를 찾을 수 없습니다."));

        List<String> diseases = ChatUtil.splitString(userDetail.getDisease());
        List<String> allergies = ChatUtil.splitString(userDetail.getAllergy());
        List<String> familyHistory = ChatUtil.splitString(userDetail.getFamilyHistory());

        ChatUserContext chatUserContext = new ChatUserContext(
                userNum, 
                userDetail.getUserAge(), 
                diseases, 
                allergies, 
                familyHistory, 
                msg
        );
        
        return chatUserContext;
    } 

    // 유저 정보 찾기
    @Transactional
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

    // 유저 보유 코인 찾기
    public int getUserCoin(Long userNum){
        return userRepository.findByUserNum(userNum)
            .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."))
            .getCoin();
    }
}
