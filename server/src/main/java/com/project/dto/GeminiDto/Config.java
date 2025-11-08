package com.project.dto.GeminiDto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Config(
    @JsonProperty("temperature")
    Double temp
) {
    
}
