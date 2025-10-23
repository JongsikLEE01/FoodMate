package com.project.dto.UserDto;

import com.project.entity.User;

public record UserResponse(
    Long userNum,
    String userId,
    String providerId,
    String userName,
    Integer coin
) {
    public static UserResponse fromEntity(User entity){
        return new UserResponse(
            entity.getUserNum(),
            entity.getUserId(),
            entity.getProviderId(),
            entity.getUserName(),
            entity.getCoin()
        );
    }
}
