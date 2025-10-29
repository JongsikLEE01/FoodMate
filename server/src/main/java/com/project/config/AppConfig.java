package com.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class AppConfig {
    
    // JSON 문자열 파싱용 빈
    @Bean
    public ObjectMapper objectMapper(){
        return new ObjectMapper();
    }
}
