package com.project.Controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.project.dto.ChatLogDto.ChatLogRequest;
import com.project.dto.ChatLogDto.ChatLogResponse;
import com.project.service.ChatLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatLogController {
    private final ChatLogService chatLogService;

    /**
     * 채팅 로그 조회
     * @param auth
     * @return
     */
    @GetMapping("/logs")
    public ResponseEntity<List<ChatLogResponse>> getChatLogs(Authentication auth) {
        Long userNum = Long.parseLong(auth.getName()); 
        List<ChatLogResponse> res = chatLogService.getChatLogs(userNum); 
        
        return ResponseEntity.ok(res);
    }
    
    /**
     * 유저 채팅 저장
     * @param request
     * @param auth
     * @return
     */
    @PostMapping("/question")
    public ResponseEntity<ChatLogResponse> saveUserChat(@RequestBody ChatLogRequest request, Authentication auth) {
        Long userNum = Long.parseLong(auth.getName());
        
        // Request의 userNum과 인증된 userNum이 다를 경우 예외 처리
        if (!userNum.equals(request.userNum())) {
            return ResponseEntity.status(403).build();
        }

        ChatLogResponse res = chatLogService.saveUserChat(request);
        
        return ResponseEntity.ok(res);
    }
}