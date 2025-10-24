package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.project.dto.UserDetailDto.UserDetailRequest;

@Entity
@Table(name = "USER_DETAILS")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetail {
    @Id
    @Column(name = "USER_NUM")
    private Long userNum;               // 유저번호
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "USER_NUM")
    private User user;                  // user join
    @Column(name = "USER_AGE")
    private Integer userAge;            // 나이
    @Column(name = "DISEASE")
    private String disease;             // 보유 질병
    @Column(name = "FAMILY_HISTORY")
    private String familyHistory;       // 가족력
    @Column(name = "ALLERGY")
    private String allergy;             // 알러지
    @Column(name = "INS_DT")
    private LocalDateTime insDt;        // 생성일
    @Column(name = "UPD_DT")
    private LocalDateTime updDt;        // 수정일

    @PrePersist
    protected void onCreate() {
        insDt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updDt = LocalDateTime.now();
    }

    // 업데이트 메서드
    public UserDetail update(UserDetailRequest request) {
        this.userAge = request.userAge();
        this.disease = request.disease();
        this.familyHistory = request.familyHistory();
        this.allergy = request.allergy();
        return this;
    }

}