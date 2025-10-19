package com.project.dto;

public record ChatLogDto(
    Long chatId,
    String message,
    String senderType,
    String sentDt,
    Long userNum
){ }
