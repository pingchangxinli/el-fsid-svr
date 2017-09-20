package com.el.demo.auth;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Component;

/**
 * 用户上下文信息提供者
 *
 * @author neo.pan
 * @since 17/4/30
 */
@Component
public class DemoAuthPrincipalProvider {
    /**
     * @return 当前用户上下文
     */
    public DemoAuthPrincipal getPrincipal() {
        return (DemoAuthPrincipal) SecurityUtils.getSubject().getPrincipal();
    }
}
