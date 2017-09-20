package com.el.demo.service;

import com.el.demo.domain.DemoMsg;
import com.el.demo.mapper.DemoMsgMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Stream;

/**
 * @author neo.pan
 * @since 17/4/29
 */
@Profile("demo")
@Service
public class DemoTxServiceImpl implements DemoTxService {

    @Autowired
    private DemoMsgMapper msgMapper;

    @Transactional
    @Override
    public void createMsgs(DemoMsg... msgs) {
        Stream.of(msgs).forEach(msg -> msgMapper.insertMsg(msg));
    }
}
