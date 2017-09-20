package com.el.demo.domain;

import com.el.demo.datapower.DemoDpIndices;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.val;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(of = "id", callSuper = false)
public class DemoMsg extends DemoDpIndices {
    /**
     * - S_DEMO_MSGS.ID
     */
    private Integer id;

    /**
     * - S_DEMO_MSGS.SUBJECT
     */
    private String subject;

    /**
     * - S_DEMO_MSGS.CONTENT
     */
    private String content;

    /**
     * - S_DEMO_MSGS.POST_AT
     */
    private LocalDateTime postAt = LocalDateTime.now();

    /**
     * - S_DEMO_MSGS.COST
     */
    private BigDecimal cost;

    @JsonIgnore
    private LocalDate unusedField = LocalDate.now();

    public static DemoMsg createBy(DemoDpIndices dpis, String subject, BigDecimal cost) {
        val msg = new DemoMsg();
        msg.setDpis(dpis);
        msg.subject = subject;
        msg.content = subject;
        msg.cost = cost;
        return msg;
    }
}
