package com.el.rfid.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@EqualsAndHashCode(of = "itemCode", callSuper = false)
public class MaterielRegistration implements Serializable {
    private static final long serialVersionUID = 9204387563419734438L;
    private String itemCode;
    private String materielCode;
    private String registrationCode;
    private String registrationDate;
}
