package com.el.demo.auth;

import com.el.core.DevError;
import com.el.core.auth.ApiRuleCfg;
import com.el.core.auth.ApiRuleProvider;

import java.util.Collections;
import java.util.List;

/**
 * @author neo.pan
 * @since 17/4/20
 */
public class DemoApiRuleProvider implements ApiRuleProvider {

    @Override
    public String funcOf(String roleId, String funcId) {
        throw DevError.todo();
    }

    @Override
    public List<ApiRuleCfg> rulesOfFunc() {
        return Collections.emptyList();
    }

    @Override
    public List<ApiRuleCfg> rulesOfPage() {
        return Collections.emptyList();
    }

    @Override
    public List<ApiRuleCfg> rulesOfModule() {
        return Collections.emptyList();
    }
}
