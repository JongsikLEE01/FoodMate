package com.project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentDto(
    Long payId,
    BigDecimal payAmount,
    String payMethod,
    Integer coinAmount,
    String payStatus,
    LocalDateTime payDt,
    Long userNum
) { }
