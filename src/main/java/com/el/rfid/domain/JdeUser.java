package com.el.rfid.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JdeUser {
    private String servicePack;
    private String userId;
    private String env;
    private String role;
    private String timeout;
}
