package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNum;

    @Column(unique = true, nullable = false)
    private String userId;          // 카카오 이메일
    private String providerId;      // 카카오 고유 ID
    private String userName;        // 닉네임
    private Integer userAge;        // 나이
    private String disease;         // 보유질병
    private String familyHistory;   // 가족력
    private String allergy;         // 알러지
    private Integer coin = 0;       // 코인
    private LocalDateTime insDt;    // 가입일
    private LocalDateTime updDt;    // 수정일
    
    // 카카오 회원가입/업데이트를 위한 빌더
    public static User createKakaoUser(String email, String nickname, String providerId) {
        return User.builder()
                .userId(email)
                .providerId(providerId)
                .userName(nickname)
                .insDt(LocalDateTime.now())
                .coin(10)
                .build();
    }
}