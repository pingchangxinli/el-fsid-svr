package com.el.demo.scheduling;

import com.el.demo.service.DemoTextService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * @author neo.pan
 * @since 16/11/15
 */
@Slf4j
public class DemoTask2 implements Runnable {

    @Autowired
    @Qualifier("textService")
    private DemoTextService textService;

    @Override
    public void run() {
        log.info("[DEMO-TASK] {}", textService.toUpperCase("Hello Task 2"));
    }
}
