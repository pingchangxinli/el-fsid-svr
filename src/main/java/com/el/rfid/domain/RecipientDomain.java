package com.el.rfid.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RecipientDomain implements Serializable {

    private String orderId;//订单号
    private String orderType;//订单类型
    private String orderCompany;//订单公司
    private String lineNumber;//订单行号
    private String storeHouse;//分布场所
    private String orderAmount;//订购数量
    private String unit;//计量单位
    private String storeHouseLocation;
    private String batchNumber;//批次号
    private String supplierCode;//供应商编号
    private String itemCode;//商品编码
    private String orderDate;//订单日期
    private String promiseDate;//承诺日期
    private String operator;//
    private String saler;//业务员编号
    private String shortItemCode;//
    private String previouStatus;//
    private String nextStatus;//下个状态
    private String lastStatus;//上个状态
    private String receivedAmount;//
    private String uncollectedAmount;//
    private String receiveDate;//
    private String receiveAddress;//
}
