package com.project.entity;

import java.util.List;

public record ChatUserContext(
    Long userNum,
    int age,
    String name,
    List<String> diseases,
    List<String> allergies,
    List<String> familyHistory,
    String message
) {
}
