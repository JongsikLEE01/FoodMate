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
    @Column(name = "REF_ID")
    private Long refId;

    @Column(name = "REF_AMOUNT", nullable = false)
    private BigDecimal refAmount;

    @Column(name = "REF_REASON")
    private String refReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "REF_STATUS")
    private RefundStatus refStatus = RefundStatus.REQUESTED;

    @Column(name = "REF_DT")
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
