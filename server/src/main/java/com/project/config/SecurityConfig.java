package com.project.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.project.util.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CORS 설정을 먼저 적용
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        
        // CSRF 비활성화 (OAuth 콜백에서는 CSRF 토큰을 포함할 수 없음)
        http.csrf(AbstractHttpConfigurer::disable);
        
        // 세션 관리 설정
        http.sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
        
        // 요청 권한 설정
        http.authorizeHttpRequests(auth -> auth
                // OPTIONS 요청 (CORS preflight) 먼저 허용
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // POST 요청: 카카오 로그인 콜백 허용
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/kakao/callback").permitAll()
                // POST 요청: 토큰 재발급 허용
                .requestMatchers(HttpMethod.POST, "/api/v1/auth/token/reissue").permitAll()
                // GET 요청: 인증 필요 없는 auth 경로 허용
                .requestMatchers(HttpMethod.GET, "/api/v1/auth/**").permitAll()
                // 임시: 개발 중 루트 접속 확인을 위해 GET / 허용
                .requestMatchers(HttpMethod.GET, "/").permitAll()
                // 그 외 모든 요청은 인증 필요
                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L); // 1시간 동안 preflight 캐시

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}