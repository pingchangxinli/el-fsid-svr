package com.el.rfid.service;

import com.el.rfid.domain.RecipientDetailDomain;
import com.el.rfid.domain.RecipientDomain;
import com.el.rfid.mapper.jde.JdeRecipientMapper;
import com.el.rfid.mapper.rfid.RecipientMapper;
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
    private JdeRecipientMapper jdeRecipientMapper;
    @Autowired
    private RecipientMapper recipientMapper;
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public List<RecipientDomain> getUnrecipient(RecipientDomain recipientDomain) {
        List<RecipientDomain> list = jdeRecipientMapper.getUnrecipient(recipientDomain);
        return list;
    }

    @Override
    public List<RecipientDetailDomain> getUnrecipientDetail(RecipientDetailDomain recipientDetailDomain) {
        List<RecipientDetailDomain> list = jdeRecipientMapper.getUnrecipientDetail(recipientDetailDomain);
        return list;
    }

    @Override
    @Transactional(value = "rfidTransactioinManager")
    public int recipientJdeToLocal(RecipientDetailDomain recipientDetailDomain) {
        int result = 0;//默认失败
        List<RecipientDetailDomain> recipientDetailDomains = jdeRecipientMapper.getUnrecipientDetail(recipientDetailDomain);
        if (recipientDetailDomains != null && recipientDetailDomains.size() > 0) {
            recipientMapper.deleteLocalRecipientDetail(recipientDetailDomain);
            for (int i = 0; i < recipientDetailDomains.size(); i++) {
                result = recipientMapper.insertLocalRecipientDetail(recipientDetailDomains.get(i));
            }
        }
        return result;
    }

    @Override
    public List<RecipientDetailDomain> getLocalUnrecipientDetail(RecipientDetailDomain recipientDetailDomain) {
        List<RecipientDetailDomain> list = recipientMapper.getLocalUnrecipientDetail(recipientDetailDomain);
        return list;
    }
}
