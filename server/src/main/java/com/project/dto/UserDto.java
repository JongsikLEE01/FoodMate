package com.project.dto;

public record UserDto(
    Long userNum,
    String userId,
    String userName,
    int userAge,
    String disease,
    String familyHistory,
    String allergy,
    String coin
) { }

