package com.el.rfid.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class Rfid implements Serializable {
    private static final long serialVersionUID = 4771823089917211384L;
    private Integer id;
    //创建时间
    private Date rfidCreateDate;
    //创建时刻
    private Date rfidCreateTime;
    //操作人
    private String operator;
    //操作人名称
    private String operatorName;
    //更新时刻
    private Date rfidUpdateTime;
    //更新操作人
    private String updateOperator;
    //更新操作人名称
    private String updateOperatorName;

    private List<RfidDetail> list;

}
