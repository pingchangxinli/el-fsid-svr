package com.el.demo.controller;

import com.el.demo.auth.DemoAuthPrincipalProvider;
import com.el.demo.domain.DemoMsg;
import com.el.demo.service.DemoTxService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Stream;

/**
 * @author neo.pan
 * @since 17/4/29
 */
@Profile("demo")
@Slf4j
@RestController
@RequestMapping("/demo")
public class DemoTxController {

    @Autowired
    private DemoTxService demoTxService;

    @Autowired
    private DemoAuthPrincipalProvider principalProvider;

    @PostMapping("/tx")
    public void sendMsg(@RequestBody DemoMsg[] msgs) {
        val msgCount = msgs.length;
        if (msgCount > 0) {
            log.debug("[DEMO-TX] msg count={}", msgCount);
            log.debug("[DEMO-TX] msg[0]={}", msgs[0]);
            val principal = principalProvider.getPrincipal();
            Stream.of(msgs).forEach(msg -> msg.setDpis(principal.getDpis()));
            demoTxService.createMsgs(msgs);
        }
    }

}
