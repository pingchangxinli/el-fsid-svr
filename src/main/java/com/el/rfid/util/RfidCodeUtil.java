package com.el.rfid.util;

import lombok.NonNull;
import lombok.experimental.var;
import org.bson.types.Code;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Map;

public class RfidCodeUtil {
    /**
     * 区分编码方式
     *
     * @param code
     * @return
     */
    public static CodeType getType(@NonNull @NotBlank String code) {
        if (code.indexOf("00") == 0 || code.indexOf("01") == 0 || code.indexOf("02") == 0) {
            return CodeType.GS1;
        } else if (code.indexOf("+") == 0) {
            return CodeType.HBIC;
        } else {
            return CodeType.CUSTOM;
        }
    }

    public static String getGtin(@NonNull @NotBlank String code) {
        if (code.indexOf("00") == 0) {

        } else if (code.indexOf("01") == 0) {
            //获取01后面的14位数字，此为GTIN码
            return code.substring(2, 16);
        } else if (code.indexOf("02") == 0) {

        }
        return "";
    }

    /**
     * 通过GS1获取物料编码
     *
     * @param code
     * @return
     */
    public static String getMaterielCodeFromGS1(@NotBlank @NonNull String code) {
        if (code.indexOf("00") == 0) {

        } else if (code.indexOf("01") == 0) {
            return code.substring(9, 15);
        } else if (code.indexOf("02") == 0) {

        }
        return "";
    }

    /**
     * j
     * （+）+（4位定长厂商代码）+（不定长 物料编码）+（1位定长，单位代码）+（1位定长，验证码）
     *
     * @param code
     * @return
     */
    public static String getMaterielCodeFromHIBC(@NotBlank @NonNull String code) {
        return code.substring(5, code.length() - 2);
    }
}
