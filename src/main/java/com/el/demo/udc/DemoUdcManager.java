package com.el.demo.udc;

import com.el.core.redis.RedisKeyspaceResolver;
import com.el.core.udc.UdcDataProvider;
import com.el.core.udc.UdcManager;
import com.el.core.udc.UdcOperator;
import com.el.core.udc.UdcResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Profile("demo")
@Component
public class DemoUdcManager extends UdcManager {

    @Autowired
    private RedisKeyspaceResolver keyspaceResolver;

    @Override
    protected String cacheNamePrefix() {
        return keyspaceResolver.cacheSpace();
    }

    private final static UdcResolver udcResolver = DemoUdc::valueOf;

    @Autowired
    private UdcDataProvider udcDataProvider;

    @Autowired
    private UdcOperator udcOperator;

    @Override
    protected UdcDataProvider udcDataProvider() {
        return udcDataProvider;
    }

    @Override
    protected UdcOperator udcOperator() {
        return udcOperator;
    }

    @Override
    protected UdcResolver udcResolver() {
        return udcResolver;
    }

}
