package com.el.demo.auth;

import com.el.core.auth.AuthPrincipal;
import com.el.demo.datapower.DemoDpIndices;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.val;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;

/**
 * @author neo.pan
 * @since 17/4/27
 */
@Data
@EqualsAndHashCode(of = "id")
public class DemoAuthPrincipal implements AuthPrincipal {

    /**
     * 唯一标识: 一般为系统用户表ID
     */
    private Integer id;
    /**
     * 授权信息: 一般为系统角色
     */
    private String role;

    /**
     * 数据权限相关属性
     */
    private DemoDpIndices dpis;

    @Override
    public String getName() {
        return String.valueOf(id);
    }

    @Override
    public AuthorizationInfo toAuthorizationInfo() {
        val info = new SimpleAuthorizationInfo();
        info.addRole(role);
        return info;
    }
}
