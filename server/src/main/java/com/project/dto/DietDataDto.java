package com.project.dto;

public record DietDataDto(
    Long dataId,
    String diseaseName,
    String dataJson,
    String insDt,
    String updDt
) { }
