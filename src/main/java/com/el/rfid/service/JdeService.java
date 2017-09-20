package com.el.rfid.service;

import com.el.rfid.domain.DeliveryOrderDetail;
import com.el.rfid.domain.Materiel;
import lombok.NonNull;
import org.hibernate.validator.constraints.NotBlank;

import java.util.List;

public interface JdeService {

    List<Materiel> getMateriel(@NonNull @NotBlank String code);

    /**
     * 根据订单索引信息查询
     *
     * @param order
     * @return
     */
    List<DeliveryOrderDetail> getDeliveryOrder(DeliveryOrderDetail order);

    /**
     * 根据 订单ID，订单类型，公司编码获取发货单详情
     *
     * @param orderId
     * @param orderType
     * @param companyCode
     * @return
     */
    List<DeliveryOrderDetail> getDeliveryOrderDetail(String orderId, String orderType, String companyCode);
}
