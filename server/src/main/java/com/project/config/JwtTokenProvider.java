package com.project.config;

import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${JWT_KEY}")
    private String secretKey;
    @Value("${JWT_EXPIRATION}")
    private long accessToken;
    @Value("${JWT_REFRESH}")
    private long refreshToken;
    private Key key;

    @PostConstruct
    protected void init() {
        //  Base64 디코딩
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Access Token 생성
    public String createAccessToken(Long userNum) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessToken);

        return Jwts.builder()
            .claims() 
                .subject(String.valueOf(userNum)) 
                .issuedAt(now)
                .expiration(validity) 
            .and()
            .signWith(this.key)
            .compact();
    }
    
    // Refresh Token 생성
    public String createRefreshToken(Long userNum) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshToken); 

        return Jwts.builder()
                .claims()
                    .subject(String.valueOf(userNum))
                    .issuedAt(now)
                    .expiration(validity)
                .and()
                .signWith(this.key)
                .compact();
    }

    // 토큰에서 사용자 고유 ID 추출
    public Long getUserNum(String token) {
        Claims claims = getClaims(token);
        if (claims != null) {
            return Long.parseLong(claims.getSubject());
        }
        return null;
    }

    // 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(this.key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
    
    // 토큰 검증 및 Claims 추출
    private Claims getClaims(String token) {
        try {
            return Jwts.parser() 
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            // ...
            return null;
        }
    }
}