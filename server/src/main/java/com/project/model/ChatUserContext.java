package com.project.model;

import java.util.List;

public record ChatUserContext(
    Long userNum,
    int age,
    List<String> diseases,
    List<String> allergies,
    List<String> familyHistory,
    String message
) {
}
