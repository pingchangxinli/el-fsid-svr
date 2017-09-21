package com.el.rfid.service;

import com.el.rfid.domain.RecipientDetailDomain;
import com.el.rfid.domain.RecipientDomain;
import com.el.rfid.mapper.jde.RecipientMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(value = "rfidTransactioinManager")
public class RecipientServiceImpl implements RecipientService {
    @Autowired
    private RecipientMapper recipientMapper;
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public List<RecipientDomain> getUnrecipient(RecipientDomain recipientDomain) {

        List<RecipientDomain> list = recipientMapper.getUnrecipient(recipientDomain);
        return list;
    }

    @Override
    public List<RecipientDetailDomain> getUnrecipientDetail(RecipientDetailDomain recipientDetailDomain) {

        List<RecipientDetailDomain> list = recipientMapper.getUnrecipientDetail(recipientDetailDomain);
        return list;
    }
}
