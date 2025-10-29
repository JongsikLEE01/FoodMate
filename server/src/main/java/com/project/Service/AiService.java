package com.project.service;

import com.project.entity.ChatUserContext;

public interface AiService {
    // AI 응답 받기
    String callAi(ChatUserContext userContext, String msg);
}
