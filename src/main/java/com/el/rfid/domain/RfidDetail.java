package com.el.rfid.domain;

import com.el.rfid.util.RfidStatusEnum;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RfidDetail implements Serializable {
    private static final long serialVersionUID = -3676768812310995835L;
    private Integer id;
    private Integer recordId;
    private String tid;
    private String epc;
    private String itemCode;
    private String batchNumber;
    private String registrationCode;
    private Date productionDate;
    private Date expiryDate;
    private Integer tidId;
    private String firstCode;
    private String secondCode;
    private String thirdCode;
    private String materielCode;
    private String company;
    private Integer orderId;
    private Date createTime;
    private String operator;
    private String lot;
    private Date registrationExpiryDate;
    private Integer serial;
    private String productionCretificate;
    private Date productionExpiryDate;
    private String unit;
    private Date createDate;
    private RfidStatusEnum status;
    private String gtin;
    private String originalTid;
    private String specifications;
}
