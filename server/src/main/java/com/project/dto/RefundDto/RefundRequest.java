package com.project.dto.RefundDto;

public record RefundRequest(
    Long refundId,
    Long payId,
    String refundReason,
    String refundStatus,
    String refundDt,
    Long userNum
) { }
