package com.el.rfid.service;

import com.el.rfid.domain.Rfid;
import com.el.rfid.domain.RfidDetail;
import com.el.rfid.mapper.rfid.RfidMaterielMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(value = "rfidTransactioinManager")
public class RfidServiceImpl implements RfidService {
    @Autowired
    private RfidMaterielMapper rfidMapper;
    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public Boolean saveRfids(Rfid rfid) {
        Integer id = rfidMapper.saveRfid(rfid);
        log.debug("[RFID-service], table rfid :{}", rfid);
        for (RfidDetail detail : rfid.getList()) {
            detail.setRecordId(rfid.getId());
        }
        rfidMapper.batchInsert(rfid.getList());
        return null;
    }

    @Override
    public List<RfidDetail> getMaterielRfid(RfidDetail rfidDetail) {

        List<RfidDetail> list = rfidMapper.queryMaterielRfid(rfidDetail);

        return list;
    }

    @Override
    public Integer updateMaterielRfid(RfidDetail rfidDetail) {
        return rfidMapper.updateMaterielRfid(rfidDetail);
    }
/*
    @Override
    public Integer updateMaterielRfid(Integer tidId, String originalTid, String tid) {
        return rfidMapper.updateMaterielRfid(tidId,originalTid,tid);
    }
    */
}
