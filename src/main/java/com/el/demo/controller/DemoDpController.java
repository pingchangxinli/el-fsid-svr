package com.el.demo.controller;

import com.el.core.domain.PagingResult;
import com.el.core.jdbc.datapower.DataPower;
import com.el.demo.domain.DemoMsg;
import com.el.demo.mapper.DemoMsgMapper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

/**
 * @author neo.pan
 * @since 17/4/21
 */
@Profile("demo")
@Slf4j
@RestController
@RequestMapping("/demo")
public class DemoDpController {

    @Autowired
    private DemoMsgMapper demoMsgMapper;

    @DataPower(code = "DP_DEMO_MSG", desc = "消息数据权限")
    @GetMapping("/dp")
    public PagingResult<DemoMsg> queryWithDdataPower(DemoDpQuery query) {
        log.debug("[DEMO-DP] query={}", query);

        val rows = demoMsgMapper.msgsOf(query);
        val total = demoMsgMapper.msgCountOf(query);
        return PagingResult.of(rows, total);
    }

}
