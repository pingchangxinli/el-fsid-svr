package com.el.rfid.util;


public enum RfidStatusEnum {
    VALID(0),//有效
    INVALID(1);//无效
    private int status;

    RfidStatusEnum(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
