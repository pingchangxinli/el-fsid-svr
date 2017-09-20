package com.el.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * @author neo.pan
 * @since 16/11/16
 */
@Slf4j
@Profile("demo")
@Service("textService")
public class DemoTextServiceImpl implements DemoTextService {

    public DemoTextServiceImpl() {
        log.debug("[DEMO] demoTextService");
    }

    @Override
    public String toUpperCase(String text) {
        return text.toUpperCase();
    }

    @Override
    public String toLowerCase(String text) {
        return text.toLowerCase();
    }
}
