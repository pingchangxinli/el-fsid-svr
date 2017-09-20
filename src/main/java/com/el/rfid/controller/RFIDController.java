package com.el.rfid.controller;

import com.el.rfid.domain.*;
import com.el.rfid.service.JdeService;
import com.el.rfid.service.RfidService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;

@Slf4j
@RestController
public class RFIDController {

    @Autowired
    private JdeService jdeService;
    @Autowired
    private RfidService rfidService;
    @Autowired
    private RestTemplateBuilder builder;
    @Value("jde.user.path")
    private String jdeUserPath;

    /**
     * 根据GS1或者HIBC码获取物料信息
     *
     * @param code GS1或者HIBC码,
     *             GS1码获取的是01后面的GTIN码，用该码做和物料关联，01后面14位，最后一位为校验位
     *             HIBC码需要获取其中的物料编码，
     *             自定义编码，用该编码直接对应物料
     * @return
     */
    @RequestMapping(value = "/meteriel/{code}", method = RequestMethod.GET)
    public List<Materiel> getMaterielByCode(@PathVariable("code") String code) {
        List<Materiel> materiel = jdeService.getMateriel(code);
        return materiel;
    }

    /**
     * 批量插入RFID和物料的对应关系
     *
     * @param rfid 前端传json数组格式
     * @return
     */
    @RequestMapping(value = "/rfids", method = RequestMethod.POST)
    public String saveRfidInfo(@RequestBody Rfid rfid) {
        log.debug("[RFID-controller] save rfids : {}", rfid);
        Boolean isSuccess = rfidService.saveRfids(rfid);
        return String.valueOf(isSuccess);

    }

    @RequestMapping(value = "/rfid", method = RequestMethod.GET)
    public List<RfidDetail> getMaterielRfid(RfidDetail rfidDetail) {
        log.debug("[RFID-controller] get rfid: {}", rfidDetail);
        return rfidService.getMaterielRfid(rfidDetail);
    }

    /**
     * @param tidId
     * @param rfidDetail
     * @return
     */
    @RequestMapping(value = "/rfid/{tidId:[^.]+}", method = RequestMethod.PUT)
    public Integer updateMeterielRfid(@PathVariable("tidId") Integer tidId, @RequestBody RfidDetail rfidDetail) {
        log.debug("[RFID-controller update materiel:tidid:{} rfid:{}]", tidId, rfidDetail);
        return rfidService.updateMaterielRfid(rfidDetail);
    }

    @Deprecated
    @RequestMapping(value = "/jde/user", method = RequestMethod.GET)
    public String getJdeUser(@RequestParam("jessonId") String jessionId, @RequestParam("e1AppState") String e1AppState) {
        RestTemplate restTemplate = builder.build();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cookie", "JSESSIONID=" + jessionId);
        headers.add("Cookie", "e1AppState=" + e1AppState);
        headers.set("Content-type", "application/json; charset=utf-8");

        HttpEntity<JSONObject> entity = new HttpEntity<JSONObject>(null, headers);
        HttpEntity<String> response = restTemplate.exchange(
                jdeUserPath + "?outputType=JSON&timeStamp=" + new Date().getTime(), HttpMethod.GET, entity, String.class);
        log.debug("[RFID-CONTROLLER] jdeUser:{}", response);
        log.debug("[RFID-CONTROLLER] response body : {}", response.getBody());
        return response.getBody();
    }

    /**
     * 发货界面查询默认查询，companyCode公司编号不能为空，
     * 防止查询到其他公司订单
     *
     * @param order
     * @return
     */
    @RequestMapping(value = "/rfid/deliveryOrder", method = RequestMethod.GET)
    public List<DeliveryOrderDetail> getDeliveryOrder(DeliveryOrderDetail order) {
        if (order.getCompanyCode() == null) {
            log.info("默认查询发货缩略信息为空", new NullPointerException("companyCode is null"));
            return null;
        }
        log.debug("[RFID-CONTROLLER] getDeliveryOrder, param : {}", order);
        List<DeliveryOrderDetail> list = jdeService.getDeliveryOrder(order);
        log.debug("[RFID-CONTROLLER] getDeliveryOrder, result: {}", list);

        return list;
    }

    /**
     * 发货界面，查询某一特定订单的具体信息
     *
     * @param orderId     订单ID
     * @param orderType   订单类型
     * @param companyCode 公司编码
     * @return
     */
    @RequestMapping(value = "/rfid/deliveryOrderDetail", method = RequestMethod.GET)
    public List<DeliveryOrderDetail> getDeliveryOrderDetail(@NonNull @RequestParam("orderId") String orderId, @NonNull @RequestParam("orderType") String orderType,
                                                            @NonNull @RequestParam("companyCode") String companyCode) {

        return jdeService.getDeliveryOrderDetail(orderId, orderType, companyCode);
    }
}
