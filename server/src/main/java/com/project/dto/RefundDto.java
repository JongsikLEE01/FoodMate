package com.project.dto;

public record RefundDto(
    Long refundId,
    Long payId,
    String refundReason,
    String refundStatus,
    String refundDt,
    Long userNum
)
{ }
