package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "USERS")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNum;

    @Column(nullable = false, length = 100)
    private String userId;

    @Column(nullable = false, length = 100)
    private String userPw;

    @Column(nullable = false, length = 100)
    private String userName;

    @Column
    private Integer userAge;

    @Column(length = 255)
    private String disease;

    @Column(length = 255)
    private String familyHistory;

    @Column(columnDefinition = "json")
    private String allergy; // JSON은 문자열로 저장, 필요하면 ObjectMapper로 변환

    @Column(nullable = false)
    private Integer coin = 0;

    @Column(updatable = false)
    private LocalDateTime insDt;

    @Column
    private LocalDateTime updDt;
}
