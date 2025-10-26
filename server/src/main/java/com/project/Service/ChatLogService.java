package com.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.ChatLogDto.ChatLogRequest;
import com.project.dto.ChatLogDto.ChatLogResponse;
import com.project.entity.ChatLog;
import com.project.entity.User;
import com.project.repository.ChatLogRepository;
import com.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatLogService {
    private final UserRepository userRepository;
    private final ChatLogRepository chatLogRepository;

    // 채팅 목록 조회 (해당 유저의 모든 로그)
    // @Transactional(readOnly = true) = 조회 전용 트랜잭션
    @Transactional(readOnly = true)
    public List<ChatLogResponse> getChatLogs(Long userNum) {
        // 유저 번호로 모든 채팅 로그를 조회
        List<ChatLog> chatLogs = chatLogRepository.findByUserNum(userNum);
        
        // List를 DTO List로 변환
        return chatLogs.stream()
                    .map(ChatLogResponse::fromEntity)
                    .collect(Collectors.toList());
    }

    // 채팅 저장
    @Transactional
    public ChatLogResponse saveChatLog(ChatLogRequest request){
        // user 존재 여부 확인
        Long userNum = request.userNum();
        User user = userRepository.findById(userNum)
                                .orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다. UserNum: " + userNum));
        
        // ChatLog 엔티티 생성
        ChatLog newChatLog = ChatLog.builder()
            .user(user)
            .message(request.message())
            .senderType(request.senderType())
            .build();
        
        ChatLog savedChatLog = chatLogRepository.save(newChatLog);
        return ChatLogResponse.fromEntity(savedChatLog);
    }
}
