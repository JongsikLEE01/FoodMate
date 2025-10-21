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
    @Column(name = "user_num")
    private Long userNum;

    @Column(name = "user_id", unique = true, nullable = false)
    private String userId;          // 카카오 이메일
    
    @Column(name = "provider_id", unique = true)
    private String providerId;      // 카카오 고유 ID
    @Column(name = "user_name")
    private String userName;        // 닉네임

    @Column(name = "user_age")
    private Integer userAge;        // 나이

    @Column(name = "disease")
    private String disease;         // 보유질병

    @Column(name = "family_history")
    private String familyHistory;   // 가족력

    @Column(name = "allergy")
    private String allergy;         // 알러지

    @Builder.Default
    @Column(name = "coin")
    private Integer coin = 0;       // 코인

    @Column(name = "ins_dt")
    private LocalDateTime insDt;    // 가입일

    @Column(name = "upd_dt")
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