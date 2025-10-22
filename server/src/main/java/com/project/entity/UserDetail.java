package com.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_DETAILS")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDetail {
    @Id
    @Column(name = "USER_NUM")
    private Long userNum;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "USER_NUM")
    private User user;

    @Column(name = "USER_AGE")
    private Integer userAge;

    @Column(name = "DISEASE")
    private String disease;

    @Column(name = "FAMILY_HISTORY")
    private String familyHistory;

    @Column(name = "ALLERGY")
    private String allergy;

    @Column(name = "INS_DT")
    private LocalDateTime insDt;

    @Column(name = "UPD_DT")
    private LocalDateTime updDt;

    @PrePersist
    protected void onCreate() {
        insDt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updDt = LocalDateTime.now();
    }
}