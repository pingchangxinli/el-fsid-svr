package com.el.demo.datapower;

import com.el.core.DevError;
import lombok.Getter;
import lombok.ToString;

import java.util.Arrays;

/**
 * 各种数据权限过滤策略
 *
 * @author neo.pan
 * @since 17/4/18
 */
@Getter
@ToString
public enum DemoDpPolicy implements DemoDpIndices.Filter {

    UNDEFINED("", "") {
        @Override
        public String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField) {
            throw new DevError("Undefined policy can not be applied.");
        }
    },
    DEPT_ONLY("dept", "仅查询本部门数据") {
        @Override
        public String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField) {
            return deptIdField + " = " + dpc.getDeptId();
        }
    },
    DEPT_PLUS("dept+", "查询本部门及下属部门数据") {
        @Override
        public String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField) {
            return deptIdField + " IN " + dpc.sqlDeptIdSet();
        }
    },
    EMPL_ONLY("empl", "仅查询该员工数据") {
        @Override
        public String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField) {
            return emplIdField + " = " + dpc.getEmplId();
        }
    },
    EMPL_PLUS("empl+", "查询该员工及下属员工数据") {
        @Override
        public String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField) {
            return emplIdField + " IN " + dpc.sqlEmplIdSet();
        }
    },;

    private final String code;
    private final String desc;

    DemoDpPolicy(String name, String desc) {
        this.code = name;
        this.desc = desc;
    }

    public static DemoDpPolicy of(String code) {
        return Arrays.stream(DemoDpPolicy.values())
                .filter(v -> v.getCode().equals(code))
                .findAny().orElse(UNDEFINED);
    }

    public boolean undefined() {
        return this == UNDEFINED;
    }

}
