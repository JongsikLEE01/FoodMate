package com.project.dto.UserDetailDto;

import com.project.entity.UserDetail;

public record UserDetailResponse(
    Long userNum,
    Integer userAge,
    String disease,
    String familyHistory,
    String allergy
) {
    public static UserDetailResponse fromEntity(UserDetail entity){
        return new UserDetailResponse(
            entity.getUserNum(),
            entity.getUserAge(),
            entity.getDisease(),
            entity.getFamilyHistory(),
            entity.getAllergy()
        );
    }

    public boolean isUserNumEmpty() {
        return this.userNum == null;
    }
}