package com.project.dto.UserDetailDto;

public record UserDetailRequest(
    Long userNum,
    Integer userAge,
    String disease,
    String familyHistory,
    String allergy
){ }
