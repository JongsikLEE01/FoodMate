package com.project.dto.GeminiDto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GeminiRequest(
    List<Content> contents, 
    @JsonProperty("generationConfig")
    Config config
) {

}