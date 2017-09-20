package com.el.demo.scheduling;

import com.el.demo.service.DemoTextService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author neo.pan
 * @since 16/11/15
 */
@Slf4j
public class DemoTask1 implements Runnable {

    @Autowired
    private DemoTextService textService;

    public DemoTask1(DemoTextService textService) {
        log.debug("[DEMO] demoTask1");
        this.textService = textService;
    }

    @Override
    public void run() {
        log.info("[DEMO-TASK] {}", textService.toUpperCase("Hello Task 1"));
    }

}
