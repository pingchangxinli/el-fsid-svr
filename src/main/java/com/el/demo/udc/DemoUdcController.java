package com.el.demo.udc;

import com.el.core.domain.CodeName;
import com.el.core.udc.UdcOpService;
import com.el.core.udc.UdcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

/**
 * @author neo.pan
 * @since 17/5/10
 */
@Profile("demo")
@RestController
@RequestMapping("/demo/udcs")
public class DemoUdcController {

    @Autowired
    private UdcService udcService;

    @Autowired
    private UdcOpService udcOpService;

    @GetMapping("/all")
    public List<CodeName> udcs() {
        return DemoUdc.all();
    }

    @GetMapping("/udc/{udc}")
    public List<CodeName> udcItems(@PathVariable("udc") DemoUdc udc) {
        return udcService.udcItems(udc);
    }

    @PostMapping("/store")
    public void storeUdc(@RequestBody DemoUdcPayload payload) {
        udcOpService.storeUdc(payload.getUdc(), payload.getItems());
    }

    @PostMapping("/udc/{udc}/evict")
    public void evictUdc(@PathVariable("udc") DemoUdc udc) {
        udcOpService.evictUdc(udc);
    }

    @PostMapping("/evict")
    public void evictAll() {
        udcOpService.evictAll();
    }

    /**
     * 比如是从DB取出来的原始数据（其中的 UDC Name 尚未被赋值）
     */
    private static List<DemoUdcSample> fetchSampleItems() {
        return Arrays.asList(
                DemoUdcSample.of("01", "Hello"),
                DemoUdcSample.of("04", "World"));
    }

    /**
     * @return 返回的原始数据
     */
    @GetMapping("/sample/items")
    public List<DemoUdcSample> sampleItems() {
        return fetchSampleItems();
    }

    /**
     * @return 返回的数据中 UDC Name 已被赋值
     */
    @GetMapping("/sample/itemsWithUdcNames")
    public List<DemoUdcSample> sampleItemsWithUdcNames() {
        return udcService.resolveUdcNames(fetchSampleItems());
    }

}
