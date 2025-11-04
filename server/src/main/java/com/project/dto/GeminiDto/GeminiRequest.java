package com.project.dto.GeminiDto;

import java.util.List;

public record GeminiRequest(List<Content> contents, Config conig) {

}