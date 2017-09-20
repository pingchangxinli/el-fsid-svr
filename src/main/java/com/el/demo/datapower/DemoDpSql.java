package com.el.demo.datapower;

import com.el.core.jdbc.SqlBuilder;

/**
 * @author neo.pan
 * @since 17/4/18
 */
public abstract class DemoDpSql extends SqlBuilder<DemoDpSql> {

    @Override
    public DemoDpSql getSelf() {
        return this;
    }

    protected DemoDpSql WHERE(DemoDpContext dpc, String deptIdField, String emplIdField) {
        WHERE(dpc.filterOf(deptIdField, emplIdField));
        return this;
    }
}
