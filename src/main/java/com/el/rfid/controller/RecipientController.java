package com.el.rfid.controller;

import com.el.rfid.domain.*;
import com.el.rfid.service.RecipientService;
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
public class RecipientController {
    @Autowired
    private RecipientService recipientService;


    /**
     * 获取JDE待收货订单
     *
     * @param recipientDomain
     * @return
     */
    @RequestMapping(value = "/recipient", method = RequestMethod.GET)
    public List<RecipientDomain> getUnrecipient(RecipientDomain recipientDomain) {
        log.debug("[RECIPIENT-controller] get recipient: {}", recipientDomain);
        return recipientService.getUnrecipient(recipientDomain);
    }

    /**
     * 获取JDE待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    @RequestMapping(value = "/recipientDetail", method = RequestMethod.GET)
    public List<RecipientDetailDomain> getUnrecipientDetail(RecipientDetailDomain recipientDetailDomain) {
        log.debug("[RECIPIENT-DETAIL-controller] get recipientDetail: {}", recipientDetailDomain);
        return recipientService.getUnrecipientDetail(recipientDetailDomain);
    }

    /**
     * 将JDE中待收款明细更新到local待收货明细
     *
     * @param recipientDetailDomain
     * @return
     */
    @RequestMapping(value = "/recipientJdeToLocal", method = RequestMethod.POST)
    public int recipientJdeToLocal(@RequestBody RecipientDetailDomain recipientDetailDomain) {
        int result = recipientService.recipientJdeToLocal(recipientDetailDomain);
        return result;
    }

    /**
     * 获取local待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    @RequestMapping(value = "/localRecipientDetail", method = RequestMethod.GET)
    public List<RecipientDetailDomain> getLocalUnrecipientDetail(RecipientDetailDomain recipientDetailDomain) {
        log.debug("[RECIPIENT-DETAIL-controller] get recipientDetail: {}", recipientDetailDomain);
        return recipientService.getLocalUnrecipientDetail(recipientDetailDomain);
    }

}
