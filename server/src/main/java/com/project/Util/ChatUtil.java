package com.project.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.project.entity.ChatLog.SenderType;

public class ChatUtil {
    private ChatUtil() { }

    // SenderType 결정
    public static SenderType checkSenderType(String responseMessage) {
        if (responseMessage.contains("고객님의") || responseMessage.contains("AI가")) {
            return SenderType.AI;
        }

        return SenderType.JSON;
    }

    // 콤마 구분 문자열 처리
    public static List<String> splitString(String data) {
        if (data == null || data.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.stream(data.split(","))
                     .map(String::trim)
                     .filter(s -> !s.isEmpty())
                     .collect(Collectors.toList());
    }
}
