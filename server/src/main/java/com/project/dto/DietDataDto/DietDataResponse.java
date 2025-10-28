package com.project.dto.DietDataDto;

import java.time.LocalDateTime;

import com.project.entity.DietData;

public record DietDataResponse(
    Long dataId,
    String diseaseName,
    String dataJson,
    LocalDateTime insDt,
    LocalDateTime updDt
) { 
    public static DietDataResponse fromEntity(DietData entity){
        return new DietDataResponse(
            entity.getDataId(),
            entity.getDiseaseName(),
            entity.getDataJson(),
            entity.getInsDt(),
            entity.getUpdDt()
        );
    }
}
