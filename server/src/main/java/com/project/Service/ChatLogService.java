package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.ChatLogDto.ChatLogRequest;
import com.project.dto.ChatLogDto.ChatLogResponse;
import com.project.entity.ChatLog;
import com.project.entity.User;
import com.project.entity.ChatLog.SenderType;
import com.project.repository.ChatLogRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatLogService {
    private final UserRepository userRepository;
    private final ChatLogRepository chatLogRepository;


    // 채팅 목록 조회 (해당 유저의 모든 로그)
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getChatHistory(Long userNum) {
        // 유저 번호로 모든 채팅 로그를 조회
        List<ChatLog> chatLogs = chatLogRepository.findByUser_UserNum(userNum);
        
        // List를 DTO List로 변환
        return chatLogs.stream()
                    .map(ChatLogResponse::fromEntity)
                    .collect(Collectors.toList());
    }

    // 유저 채팅 저장
    @Transactional
    public ChatLogResponse saveUserChat(ChatLogRequest request){
        // user 존재 여부 확인
        Long userNum = request.userNum();
        User user = userRepository.findById(userNum).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다. UserNum: " + userNum));
        
        // 코인 차감
        final int COIN_COST = 1;
        user.decreaseCoin(COIN_COST);

        // ChatLog 엔티티 생성
        ChatLog newChatLog = ChatLog.builder()
            .user(user)
            .message(request.message())
            .senderType(SenderType.USER)
            .build();
        
        ChatLog savedChatLog = chatLogRepository.save(newChatLog);
        return ChatLogResponse.fromEntity(savedChatLog);
    }

    // 챗봇 응답 저장
    @Transactional
    public void saveChatbotResponse(Long userNum, String msg, SenderType senderType){
        User user = userRepository.findById(userNum).orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다. UserNum: " + userNum));
        
        ChatLog newChatLog = ChatLog.builder()
            .user(user)
            .message(msg)
            .senderType(senderType)
            .build();

        chatLogRepository.save(newChatLog);
    }
}