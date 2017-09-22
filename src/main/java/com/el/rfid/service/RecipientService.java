package com.el.rfid.service;

import com.el.rfid.domain.RecipientDetailDomain;
import com.el.rfid.domain.RecipientDomain;

import java.util.List;

public interface RecipientService {
    /**
     * 获取JDE待收货订单
     *
     * @param recipientDomain
     * @return
     */
    List<RecipientDomain> getUnrecipient(RecipientDomain recipientDomain);

    /**
     * 获取JDE待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    List<RecipientDetailDomain> getUnrecipientDetail(RecipientDetailDomain recipientDetailDomain);

    /**
     * 将JDE中待收款明细更新到local待收货明细
     * @param recipientDetailDomain
     * @return
     */
    int recipientJdeToLocal(RecipientDetailDomain recipientDetailDomain);


    /**
     * 获取local待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    List<RecipientDetailDomain> getLocalUnrecipientDetail(RecipientDetailDomain recipientDetailDomain);
}
