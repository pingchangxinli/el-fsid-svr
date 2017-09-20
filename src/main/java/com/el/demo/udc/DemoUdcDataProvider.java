package com.el.demo.udc;

import com.el.core.udc.UdcDataProvider;
import com.el.core.domain.CodeName;
import com.el.core.domain.UdcFace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Profile("demo")
@Slf4j
@Component
public class DemoUdcDataProvider implements UdcDataProvider {

    @Autowired
//    private UdcMapper udcMapper;
    private DemoUdcStore store;

    @Override
    public List<CodeName> udcItems(UdcFace udc) {
        log.info("[DEMO] fetch udc: {}", udc);
//        return udcMapper.udcItemsOf(udc);
        return store.udcItemsOf(udc);
    }

}
