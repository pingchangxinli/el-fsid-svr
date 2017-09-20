package com.el.rfid.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class DeliveryOrderDetail {
    //商品编码
    private String itemCode;
    //客户编码
    private String customerCode;
    //客户描述
    private String customerSpec;
    //订单号
    private String orderId;
    //订单类型
    private String orderType;
    //行号
    private String lineNumber;
    //订单公司
    private String companyCode;
    //订单日期
    private Date createDate;
    //业务员
    private String saler;
    //商品描述1
    private String itemSpec1;
    //商品描述2
    private String itemSpec2;
    //数量
    private Integer amount;
    //单位
    private String unit;

}
