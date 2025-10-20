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

    private String userId;
    private String userPw;
    private String userName;
    private Integer userAge;
    private String disease;
    private String familyHistory;
    private String allergy;
    private Integer coin = 0;
    private LocalDateTime insDt;
    private LocalDateTime updDt;
}
