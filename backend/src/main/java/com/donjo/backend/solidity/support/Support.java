package com.donjo.backend.solidity.support;

import com.donjo.backend.util.TimeConvertUtil;
import lombok.*;
import org.web3j.applicationhandler.ApplicationHandler;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Support {
    public Long id;

    public String from;

    public String to;

    public Long amount;

    public LocalDateTime sendTimestamp;

    public Long supportType; //  Donation : 0, Item : 1, Wishlist : 2

    public Long supportStatus;

    public ApplicationHandler.Support toSol(){
        return new ApplicationHandler.Support(
                BigInteger.valueOf(id),
                from,
                to,
                BigInteger.valueOf(amount),
                TimeConvertUtil.convertToUint256Timestamp(sendTimestamp),
                BigInteger.valueOf(supportType),
                BigInteger.valueOf(supportStatus)
        );
    }

    public static Support fromSol(ApplicationHandler.Support s){
        return Support.builder()
                .id(s.id.longValue())
                .from(s.from)
                .to(s.to)
                .amount(s.amount.longValue())
                .sendTimestamp(TimeConvertUtil.convertToLocalDateTime(s.sendTimestamp))
                .supportType(s.supportType.longValue())
                .supportStatus(s.supportStatus.longValue())
                .build();
    }
}
