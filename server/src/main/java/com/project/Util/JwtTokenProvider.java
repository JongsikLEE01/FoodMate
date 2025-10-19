package com.project.Util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
    // 최소 256비트 키 (32바이트)
    private final String secretKey = "YOUR_VERY_LONG_SECRET_KEY_MUST_BE_AT_LEAST_32_CHAR";
    private final long validityInMilliseconds = 1000L * 60 * 60 * 24; // 24시간

    public String createToken(String userId) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)
                .compact();
    }
}
