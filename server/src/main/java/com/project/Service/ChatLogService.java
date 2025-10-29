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
    private final ChatService chatService;


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
        Long userNum = request.userNum();
        
        // 1. 유저 존재 여부 확인
        User user = userRepository.findById(userNum)
            .orElseThrow(() -> new RuntimeException("유저를 찾지 못했습니다. UserNum: " + userNum));
        
        // 2. 코인 차감
        final int COIN_COST = 1;
        if (user.getCoin() < COIN_COST) {
             throw new RuntimeException("코인이 부족합니다."); 
        }
        user.decreaseCoin(COIN_COST);

        // 3. USER ChatLog 엔티티 생성 및 DB 저장
        ChatLog userChatLog = ChatLog.builder()
            .user(user)
            .message(request.message())
            .senderType(SenderType.USER)
            .build();
        chatLogRepository.save(userChatLog);
        
        // 4. AI 응답 요청 (ChatService 이용)
        try {
            String aiResponseMessage = chatService.getChatResponse(userNum, request.message()); 

            // 5. AI ChatLog 엔티티 생성 및 DB 저장
            ChatLog aiChatLog = ChatLog.builder()
                .user(user)
                .message(aiResponseMessage)
                .senderType(SenderType.AI) 
                .build();
            ChatLog savedAiChatLog = chatLogRepository.save(aiChatLog);

            // 6. 최종적으로 AI 응답을 DTO로 반환
            return ChatLogResponse.fromEntity(savedAiChatLog);
        } catch (Exception e) {
            System.out.println("----------------AI 로직 오류 발생------------------");
            e.printStackTrace(); // 👈 상세 오류 확인용
            
            // 🚨 트랜잭션 롤백 트리거 및 클라이언트에게 오류 메시지 전달
            throw new RuntimeException("AI 서버 통신 또는 DB 처리 중 오류 발생", e); 
        }
    }
}