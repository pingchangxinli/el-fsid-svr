package com.el.demo.datapower;

import com.el.core.domain.PagingQuery;
import com.el.core.jdbc.datapower.DataPowerAware;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @author neo.pan
 * @since 17/4/26
 */
@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class DemoDpPagingQuery extends PagingQuery implements DataPowerAware<DemoDpContext> {

    private DemoDpContext dpc;
}
