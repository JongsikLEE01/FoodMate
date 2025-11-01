package com.project.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.project.entity.ChatLog.SenderType;

public class ChatUtil {
    private ChatUtil() { }
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy,MM,dd,HH,mm,ss");
    
    // 조사 제외 목록 정의
    private static final Set<String> STOP_WORDS = Set.of(
        "은", "는", "이", "가", "을", "를", "의", "와", "과", "에", "에게", "께", 
        "로", "으로", "에서", "만", "좀", "요", "도", "다", 
        "좋은", "맛있는", "추천", "궁금", "싶어", "뭐야", "뭐가", "대해", "하는", "해주세요", "해주"
    );

    // 현재 시각 포맷으로 변환
    public static String formatDateTime() {
        return LocalDateTime.now().format(DATE_TIME_FORMATTER);
    }
    
    // 임시 ChatID 생성
    public static String newChatId() {
        return UUID.randomUUID().toString();
    }

    // SenderType 결정
    public static SenderType checkSenderType(String responseMessage) {
        if (responseMessage.contains("고객님의") || responseMessage.contains("AI가")) {
            return SenderType.AI;
        }

        return SenderType.JSON;
    }

    // 문자열 처리(공백은 콤마로 변경, 조사 제외)
    public static List<String> splitString(String data) {
        if (data == null || data.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.stream(data.split(","))
                     .map(String::trim)
                     .map(String::toLowerCase)
                     .filter(s -> !s.isEmpty())
                     .filter(s -> !STOP_WORDS.contains(s))
                     .collect(Collectors.toList());
    }
}
