package com.el.demo.datapower;

import com.el.core.jdbc.datapower.DataPower;
import com.el.core.jdbc.datapower.DataPowerContext;
import lombok.Data;
import lombok.val;

import java.util.Arrays;

/**
 * 数据权限上下文信息
 *
 * @author neo.pan
 * @since 17/4/18
 */
@Data
public class DemoDpContext implements DataPowerContext {

    /**
     * 数据权限定义
     */
    private DataPower definition;
    /**
     * 数据过滤策略
     */
    private DemoDpPolicy policy;

    public void setPolicyCode(String code) {
        policy = DemoDpPolicy.of(code);
    }

    /**
     * 员工ID: 可以从用户上下文信息获取
     */
    private int emplId;
    /**
     * 下属员工ID: 可以从员工关系表获取所有下属员工ID列表(要根据实际的需求和数据量优化设计数据权限模型以提高过滤的性能，即要权衡灵活性和性能)
     */
    private int[] subEmplIds;
    /**
     * 部门ID: 可以从员工ID获取当前所在的部门ID
     */
    private int deptId;
    /**
     * 下属部门ID: 可以从部门组织表获取所有下属部门ID列表(要根据实际的需求和数据量优化设计数据权限模型以提高过滤的性能，即要权衡灵活性和性能)
     */
    private int[] subDeptIds;

    /**
     * @return 本部门及下属部门ID
     */
    String sqlDeptIdSet() {
        return toSqlSet(deptId, subDeptIds);
    }

    /**
     * @return 该员工及下属员工ID
     */
    String sqlEmplIdSet() {
        return toSqlSet(emplId, subEmplIds);
    }

    private static String toSqlSet(int id, int[] subIds) {
        val sb = new StringBuilder();
        sb.append('(');
        sb.append(id);
        Arrays.stream(subIds).forEach(subId -> sb.append(',').append(subId));
        sb.append(')');
        return sb.toString();
    }

    /**
     * @param deptIdField 查询SQL的结果集中部门ID属性名(如，d.deptId)
     * @param emplIdField 查询SQL的结果集中员工ID属性名(如，e.emplId)
     * @return SQL的过滤条件
     */
    String filterOf(String deptIdField, String emplIdField) {
        if (policy.undefined()) {
            return definition.strict() ? "1<>1" : "1=1";
        }
        return policy.filterOf(this, deptIdField, emplIdField);
    }

}
