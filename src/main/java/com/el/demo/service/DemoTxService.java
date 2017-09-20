package com.el.demo.service;

import com.el.demo.domain.DemoMsg;

/**
 * @author neo.pan
 * @since 17/4/29
 */
public interface DemoTxService {

    void createMsgs(DemoMsg... msgs);
}
