package com.project.dto.GeminiDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Candidate(
    Content content,
    int index
) {
    
} 
