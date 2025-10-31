package com.project.Controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.project.dto.ChatLogDto.ChatLogRequest;
import com.project.dto.ChatLogDto.ChatLogResponse;
import com.project.dto.ChatLogDto.ChatResponse;
import com.project.service.ChatLogService;
import com.project.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatLogController {
    private final ChatLogService chatLogService;
    private final ChatService chatService;

    /**
     * 채팅 로그 조회
     * @param auth
     * @return
     */
    @GetMapping("/history")
    public ResponseEntity<List<ChatLogResponse>> getChatLogs(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();
        Long userNum = Long.parseLong(auth.getName()); 

        List<ChatLogResponse> res = chatLogService.getChatHistory(userNum); 
        return ResponseEntity.ok(res);
    }
    
    /**
     * 유저채팅/챗봇 답변 저장
     * @param request
     * @param auth
     * @return
     */
    @PostMapping("/question")
    public ResponseEntity<?> saveUserChat(@RequestBody ChatLogRequest req, Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();
        Long userNum = Long.parseLong(auth.getName());

        try {
            // 유저 채팅 저장
            chatLogService.saveUserChat(req); 
            
            // 챗봇 답변 생성
            ChatResponse chatResponse = chatService.getChatResponse(userNum, req.message()); // ChatResponse 타입으로 받음
            
            // 챗봇 답변 DB 저장
            chatLogService.saveChatbotResponse(userNum, chatResponse.message(), chatResponse.senderType()); // 이 메소드는 별도로 구현이 필요함

            return ResponseEntity.ok(chatResponse);
        } catch(IllegalAccessException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("시스템 처리 중 오류 발생...");
        }
    }
}