package com.el.rfid.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(of = "itemCode", callSuper = false)
public class Materiel implements Serializable {
    private static final long serialVersionUID = 2482807457920338544L;
    //商品编码
    private String itemCode;
    //第一条码
    private Long firstCode;
    //第二条码
    private Long secondCode;
    //第三条码
    private Long thirdCode;
    //物料编码
    private String materielCode;
    //物料名称
    private String meterielName;
    //生产日期
    private Date productionDate;
    //失效日期
    private Date invalidDate;
    //批号
    private String batchNum;
    //注册证号
    private List<MaterielRegistration> registrationList;
    //序列号
    private String serialNum;
    //规格型号
    private String specifications;
    //GTIN
    private String gtin;

}
