package com.project.dto.DietDataDto;

public record DietDataRequest(
    Long dataId,
    String diseaseName,
    String dataJson,
    String insDt,
    String updDt
) { }
