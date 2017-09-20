package com.el.demo.udc;

import com.el.core.domain.CodeName;
import com.el.demo.udc.DemoUdc;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Data
@EqualsAndHashCode(of = "udc")
public class DemoUdcPayload {
    private DemoUdc udc;
    private List<CodeName> items;
}
