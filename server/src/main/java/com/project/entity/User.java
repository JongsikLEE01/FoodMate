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
    @Column(name = "USER_NUM")
    private Long userNum;           // 유저 번호
    @Column(name = "USER_ID", unique = true, nullable = false)
    private String userId;          // 카카오 이메일
    @Column(name = "PROVIDER_ID", unique = true)
    private String providerId;      // 카카오 고유 ID
    @Column(name = "USER_NAME")
    private String userName;        // 닉네임

    @Builder.Default
    @Column(name = "COIN")
    private Integer coin = 0;       // 코인

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserDetail userDetail;  // 사용자 상세 정보
    @Column(name = "INS_DT")
    private LocalDateTime insDt;    // 가입일
    @Column(name = "UPD_DT")
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