package com.el.rfid.service;

import com.el.rfid.domain.RecipientDetailDomain;
import com.el.rfid.domain.RecipientDomain;

import java.util.List;

public interface RecipientService {
    /**
     * 获取待收货订单
     *
     * @param recipientDomain
     * @return
     */
    List<RecipientDomain> getUnrecipient(RecipientDomain recipientDomain);

    /**
     * 获取待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    List<RecipientDetailDomain> getUnrecipientDetail(RecipientDetailDomain recipientDetailDomain);
}
