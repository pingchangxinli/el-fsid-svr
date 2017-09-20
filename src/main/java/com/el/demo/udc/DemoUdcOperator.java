package com.el.demo.udc;

import com.el.core.udc.UdcOperator;
import com.el.core.domain.CodeName;
import com.el.core.domain.UdcFace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Profile("demo")
@Slf4j
@Component
public class DemoUdcOperator implements UdcOperator {

    @Autowired
//    private UdcMapper udcMapper;
    private DemoUdcStore store;

    @Transactional
    @Override
    public void storeUdc(UdcFace udc, List<CodeName> udcItems) {
        log.info("[DEMO] store udc: {}", udc);
        // store udc
//        udcItems.forEach(item -> udcMapper.insert(udcItem));
        store.store(udc, udcItems);
    }

    @Transactional
    @Override
    public void evictUdc(UdcFace udc) {
        log.info("[DEMO] evict udc: {}", udc);
        // disable or erase udc or do nothing
    }

}
