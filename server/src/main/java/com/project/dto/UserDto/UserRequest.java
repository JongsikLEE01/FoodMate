package com.project.dto.UserDto;

public record UserRequest(
    Long userNum,
    String userId,
    String providerId,
    String userName,
    Integer coin
) { }

