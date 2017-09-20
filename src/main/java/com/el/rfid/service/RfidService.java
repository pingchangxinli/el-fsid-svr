package com.el.rfid.service;

import com.el.rfid.domain.Rfid;
import com.el.rfid.domain.RfidDetail;

import java.util.List;

public interface RfidService {
    Boolean saveRfids(Rfid rfid);

    List<RfidDetail> getMaterielRfid(RfidDetail rfidDetail);

    Integer updateMaterielRfid(RfidDetail rfidDetail);
    //Integer updateMaterielRfid(Integer tidId, String originalTid, String tid);
}
