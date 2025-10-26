package com.project.dto.PaymentDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentRequest(
    Long payId,
    BigDecimal payAmount,
    String payMethod,
    Integer coinAmount,
    String payStatus,
    LocalDateTime payDt,
    Long userNum
) { }
