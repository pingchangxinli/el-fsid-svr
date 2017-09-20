package com.el.demo.datapower;

import lombok.Data;
import lombok.val;

import java.io.Serializable;

/**
 * 数据权限索引
 *
 * @author neo.pan
 * @since 17/4/29
 */
@Data
public class DemoDpIndices implements Serializable {

    /**
     * 员工ID
     */
    private Integer emplId;
    /**
     * 部门ID
     */
    private Integer deptId;

    /**
     * 复制数据权限索引信息
     *
     * @param dpis 被复制的对象
     */
    public void setDpis(DemoDpIndices dpis) {
        emplId = dpis.emplId;
        deptId = dpis.deptId;
    }

    public static DemoDpIndices of(Integer emplId, Integer deptId) {
        val dpis = new DemoDpIndices();
        dpis.emplId = emplId;
        dpis.deptId = deptId;
        return dpis;
    }

    /**
     * 数据权限过滤策略
     */
    public interface Filter {
        /**
         * @param dpc         数据权限上下文
         * @param deptIdField 查询SQL的结果集中部门ID属性名(如，d.deptId)
         * @param emplIdField 查询SQL的结果集中员工ID属性名(如，e.emplId)
         * @return SQL的过滤条件
         */
        String filterOf(DemoDpContext dpc, String deptIdField, String emplIdField);
    }

}
