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
    @Column(name = "PAY_ID")
    private Long payId;

    @Column(name = "PAY_AMOUNT", nullable = false)
    private BigDecimal payAmount;

    @Column(name = "PAY_METHOD")
    private String payMethod;

    @Column(name = "COIN_AMOUNT", nullable = false)
    private Integer coinAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAY_STATUS")
    private PayStatus payStatus = PayStatus.SUCCESS;

    @Column(name = "PAY_DT")
    private LocalDateTime payDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NUM")
    private User user;

    public enum PayStatus {
        SUCCESS, FAILED, PENDING
    }
}
