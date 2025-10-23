package com.project.dto.UserDetailDto;

public record UserDetailRequest(
    Integer userAge,
    String disease,
    String familyHistory,
    String allergy
){ }
