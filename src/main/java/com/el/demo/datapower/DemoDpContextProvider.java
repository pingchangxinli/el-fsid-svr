package com.el.demo.datapower;

import com.el.core.jdbc.datapower.DataPower;
import com.el.core.jdbc.datapower.DataPowerContext;
import com.el.core.jdbc.datapower.DataPowerContextProvider;
import com.el.demo.auth.DemoAuthPrincipalProvider;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * @author neo.pan
 * @since 17/4/21
 */
@Profile("demo")
@Slf4j
@Component
public class DemoDpContextProvider implements DataPowerContextProvider {

    @Autowired
    private DemoAuthPrincipalProvider principalProvider;

    @Override
    public DataPowerContext getDataPowerContext(DataPower dataPower) {
        val principal = principalProvider.getPrincipal();
        log.debug("[CORE-DP] principal: {}", principal);
        val dpc = new DemoDpContext();

        // get policy code by definition code: dp.code()
        val policyCode = DemoDpPolicy.EMPL_PLUS.getCode();

        // get empl, dept, ... of current user.
        val emplId = principal.getDpis().getEmplId();
        val subEmplIds = new int[]{11, 12};
        val deptId = principal.getDpis().getDeptId();
        val subDeptIds = new int[]{111, 112};

        dpc.setDefinition(dataPower);
        dpc.setPolicyCode(policyCode);
        dpc.setEmplId(emplId);
        dpc.setSubEmplIds(subEmplIds);
        dpc.setDeptId(deptId);
        dpc.setSubDeptIds(subDeptIds);

        log.debug("[DEMO-DP] dpc={}", dpc);

        return dpc;
    }
}
