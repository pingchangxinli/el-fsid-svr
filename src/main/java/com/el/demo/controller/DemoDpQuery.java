package com.el.demo.controller;

import com.el.core.util.TimeUtil;
import com.el.demo.datapower.DemoDpPagingQuery;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * 关键字搜索
 *
 * @author neo.pan
 * @since 17/4/19
 */
@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class DemoDpQuery extends DemoDpPagingQuery {
    /**
     * 关键字
     */
    private String keyword;
    /**
     * 何日开始
     */
    @TimeUtil.YMD
    private LocalDate since;
    /**
     * 何时开始
     */
    @TimeUtil.HMS
    private LocalTime clock;

    /**
     * 何日何时开始
     */
    public LocalDateTime getWhen() {
        return LocalDateTime.of(since, clock);
    }
}
