package com.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "REFUND")
@Getter
@Setter
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refId;

    @Column(nullable = false)
    private BigDecimal refAmount;

    private String refReason;

    @Enumerated(EnumType.STRING)
    private RefundStatus refStatus = RefundStatus.REQUESTED;

    private LocalDateTime refDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_NUM")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAY_ID")
    private Payment payment;

    public enum RefundStatus {
        REQUESTED, APPROVED, DENIED
    }
}
