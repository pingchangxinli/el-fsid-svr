package com.el.rfid.service;

import com.el.rfid.domain.DeliveryOrderDetail;
import com.el.rfid.domain.Materiel;
import com.el.rfid.mapper.jde.JdeMaterielMapper;
import com.el.rfid.util.CodeType;
import com.el.rfid.util.RedisUtil;
import com.el.rfid.util.RfidCodeUtil;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional("jdeTransactioinManager")
public class JdeServiceImpl implements JdeService {

    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private JdeMaterielMapper mapper;


    @Override
    public List<Materiel> getMateriel(@NonNull @NotBlank String code) {
        Boolean hasKey = redisUtil.exists("rfid.materiel:" + code);
        if (!hasKey) {
            log.debug("[RFID-SERVICE] load materiel from databases code: {}", code);
            List<Materiel> materiel = null;
            CodeType type = RfidCodeUtil.getType(code);
            log.debug("[RFID-SERVICE] rfid first code type : {}", type);
            if (type == CodeType.GS1) {
                materiel = getMaterielByGS1(code);
            } else if (type == CodeType.HBIC) {
                materiel = getMaterielByHIBC(code);
            } else if (type == CodeType.CUSTOM) {
                materiel = mapper.findMaterielByCustom(code);
            }
            log.debug("[RFID-SERVICE] load materiel from database,materiel:{}", materiel);
            if (null != materiel) {
                redisUtil.set("rfid.materiel:" + code, materiel);
                log.debug("[RFID-SERVICE] put materiel in redis,materiel:{}", materiel);
            }
            return materiel;
        } else {
            log.debug("[RFID-SERVICE] load materiel from cache: {}", redisUtil.get("rfid.materiel:" + code));
            return (List<Materiel>) redisUtil.get("rfid.materiel:" + code);
        }
    }

    @Override
    public List<DeliveryOrderDetail> getDeliveryOrder(DeliveryOrderDetail order) {
        return mapper.getDeliveryOrder(order);
    }

    @Override
    public List<DeliveryOrderDetail> getDeliveryOrderDetail(String orderId, String orderType, String companyCode) {
        return mapper.findDeliveryOrderDetail(orderId, orderType, companyCode);
    }


    private List<Materiel> getMaterielByHIBC(String code) {
        String materielCode = RfidCodeUtil.getMaterielCodeFromHIBC(code);
        return mapper.findMaterielByMaterielCode(materielCode);
    }

    /**
     * GS1编码对应物料关系，
     * 1.查找GTIN码在首营中是否有对应关系；
     * 2.GTIN码无法找到物料，从其中截取中物料编码查找物料；
     * 3.如果上述两种都未找到物料，返回null。
     *
     * @param code
     * @return
     */
    private List<Materiel> getMaterielByGS1(String code) {
        String gtin = RfidCodeUtil.getGtin(code);
        List<Materiel> materiel = mapper.findMaterielByGtin(code);
        if (materiel == null || materiel.size() == 0) {
            String materielCode = RfidCodeUtil.getMaterielCodeFromGS1(code);
            log.debug("[RFID-SERVER] not found materiel by gtin,use materielCode:{} ", materielCode);
            mapper.findMaterielRegistrationByItemCode(materielCode);
            materiel = mapper.findMaterielByMaterielCode(materielCode);
            if (materiel == null || materiel.size() == 0) {
                log.debug("[RFID-SERVER] not found materiel by materielCode: {}", materielCode);
                return null;
            } else {
                log.debug("[RFID-SERVER] found materiel by materielCode: {}", materiel);
            }

        } else {
            log.debug("[RFID-SERVER] found materiel by GTIN: {}", materiel);
        }
        return materiel;
    }

}
