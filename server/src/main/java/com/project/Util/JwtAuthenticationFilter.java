package com.project.util;

import com.project.config.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    // HTTP 요청 헤더에서 JWT를 가져오는 키
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    // 필터링 로직: 요청당 한 번 실행
   @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    String path = request.getRequestURI();

    System.out.println(request);
    System.out.println(response);
    System.out.println(filterChain);
    // 카카오 로그인 콜백과 프리플라이트 요청은 JWT 검증 없이 통과
   // Preflight 요청은 바로 통과
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
        response.setStatus(HttpServletResponse.SC_OK);
        filterChain.doFilter(request, response);
        return;
    }

    // JWT 검증 로직
    String jwt = resolveToken(request);
    if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
        Long userNum = jwtTokenProvider.getUserNum(jwt);
        if (userNum != null) {
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                String.valueOf(userNum), "", Collections.emptyList());
            WebAuthenticationDetails details = new WebAuthenticationDetailsSource().buildDetails(request);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
            ((UsernamePasswordAuthenticationToken) authentication).setDetails(details);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    filterChain.doFilter(request, response);
}

    // 요청 헤더에서 "Bearer " 제거한 JWT 문자열을 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return null;
    }
}