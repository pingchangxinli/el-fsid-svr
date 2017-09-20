package com.el.demo.udc;

import com.el.core.domain.CodeName;
import com.el.core.domain.UdcFace;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Profile("demo")
@Component
public class DemoUdcStore {

    private Map<UdcFace, List<CodeName>> store = new ConcurrentHashMap<>();

    public DemoUdcStore() {
        // INITAL DATA
        store.put(DemoUdc.ACT_STATUS, Arrays.asList(
                CodeName.of("01", "已生成"),
                CodeName.of("02", "已派发"),
                CodeName.of("03", "已执行"),
                CodeName.of("04", "已完成")));
        store.put(DemoUdc.ACT_TYPE, Arrays.asList(
                CodeName.of("01", "JDE"),
                CodeName.of("02", "Java"),
                CodeName.of("03", ".NET"),
                CodeName.of("04", "HTML")));
        store.put(DemoUdc.RES_STATUS, Arrays.asList(
                CodeName.of("01", "FREE"),
                CodeName.of("02", "BUSY")));
        store.put(DemoUdc.RES_TYPE, Arrays.asList(
                CodeName.of("01", "JDE-Dev"),
                CodeName.of("02", "JDE-Biz"),
                CodeName.of("03", "Java-Dev"),
                CodeName.of("04", ".NET-Dev")));
    }

    public void store(UdcFace udc, List<CodeName> items) {
        store.put(udc, items);
    }

    public List<CodeName> udcItemsOf(UdcFace udc) {
        return Collections.unmodifiableList(store.get(udc));
    }

}
