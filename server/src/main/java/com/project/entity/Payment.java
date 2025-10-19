package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "PAYMENT")
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;

    @Column(nullable = false)
    private BigDecimal payAmount;

    private String payMethod;

    @Column(nullable = false)
    private Integer coinAmount;

    @Enumerated(EnumType.STRING)
    private PayStatus payStatus = PayStatus.SUCCESS;

    private LocalDateTime payDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NUM")
    private User user;

    public enum PayStatus {
        SUCCESS, FAILED, PENDING
    }
}
