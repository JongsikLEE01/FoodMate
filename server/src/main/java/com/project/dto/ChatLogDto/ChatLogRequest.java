package com.project.dto.ChatLogDto;

import com.project.entity.ChatLog.SenderType;

import lombok.NonNull;

public record ChatLogRequest(
    @NonNull
    Long userNum,
    String message,
    SenderType senderType
){ }
