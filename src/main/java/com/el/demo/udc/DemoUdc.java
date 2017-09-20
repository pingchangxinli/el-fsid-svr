package com.el.demo.udc;

import com.el.core.domain.CodeName;
import com.el.core.domain.UdcFace;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Getter
public enum DemoUdc implements UdcFace {

    ACT_TYPE("ACT", "ACT01", "活动类型"),
    ACT_STATUS("ACT", "ACT02", "活动状态"),
    RES_TYPE("RES", "RES01", "资源类型"),
    RES_STATUS("RES", "RES02", "资源状态"),;

    private final String domainCode;
    private final String udcCode;
    private final String udcDesc;

    @Override
    public String getCode() {
        return name();
    }

    @Override
    public String getDesc() {
        return udcDesc;
    }

    DemoUdc(String domainCode, String udcCode, String udcDesc) {
        this.domainCode = domainCode;
        this.udcCode = udcCode;
        this.udcDesc = udcDesc;
    }

    public static List<CodeName> all() {
        return Arrays.stream(DemoUdc.values())
                .map(udc -> CodeName.of(udc.name(), udc.getUdcDesc()))
                .collect(Collectors.toList());
    }

}
