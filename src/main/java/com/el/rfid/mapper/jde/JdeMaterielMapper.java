package com.el.rfid.mapper.jde;

import com.el.rfid.domain.DeliveryOrderDetail;
import com.el.rfid.domain.Materiel;
import com.el.rfid.domain.MaterielRegistration;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

public interface JdeMaterielMapper {


    class SqlProvider extends SQL {

        private static final String DELIVERY_ORDER_OF_SQL = "getDeliveryOrder";

        public String getDeliveryOrder(@Param("order") DeliveryOrderDetail order) {
            SELECT(" distinct sddoco order_id,sddcto order_type,sdkcoo company_code," +
                    "SUBSTR(SDDRQJ" +
                    " + 1900000, 5, 3) - 1 +  TO_DATE(SUBSTR(SDDRQJ + 1900000, 1, 4) || '0101', 'yyyymmdd') order_date," +
                    "sdan8 customer_code,'' customer_spec,SDANBY saler ");
            FROM("V_F4211");
            if (StringUtils.hasText(order.getOrderId())) {
                WHERE(" sddoco = #{order.orderId}");
            }
            if (StringUtils.hasText(order.getOrderType())) {
                WHERE(" sddcto = #{order.orderType}");
            }
            if (StringUtils.hasText(order.getCompanyCode())) {
                WHERE(" sdkcoo = #{order.companyCode}");
            }
            if (StringUtils.hasText(order.getItemCode())) {
                WHERE(" sdlitm = #{order.itemId}");
            }
            if (StringUtils.hasText(order.getCustomerCode())) {
                WHERE(" sdan8 = #{order.customerCode}");
            }
            return toString();
        }

    }

    @Select("select imlitm,spe8name,spdsc2,spe8cjwlbm,spe8gtin from V_F4101_FE84101  where spe8gtin = '${gtin}'")
    @Results(id = "findMaterielByGtin", value = {
            @Result(property = "materielCode", column = "spe8cjwlbm", jdbcType = JdbcType.NCHAR, javaType = String.class),
            @Result(property = "itemCode", column = "imlitm"),
            @Result(property = "meterielName", column = "spe8name"),
            @Result(property = "specifications", column = "spdsc2"),
            @Result(property = "gtin", column = "spe8gtin")
    })
    List<Materiel> findMaterielByGtin(@Param("gtin") String gtin);

    /**
     * 厂家物料编码有可能重复
     *
     * @param materielCode
     * @return
     */
    @Select("select imlitm,spe8name,spdsc2,spe8cjwlbm,spe8gtin from V_F4101_FE84101 where spe8cjwlbm = '#{materielCode}'")
    @Results(id = "findMaterielByMaterielCode", value = {
            @Result(property = "materielCode", column = "spe8cjwlbm", jdbcType = JdbcType.NCHAR, javaType = String.class),
            @Result(property = "itemCode", column = "imlitm"),
            @Result(property = "meterielName", column = "spe8name"),
            @Result(property = "specifications", column = "spdsc2"),
            @Result(property = "registrationList", column = "spe8cjwlbm",
                    many = @Many(select = "com.el.rfid.mapper.jde.JdeMaterielMapper.findMaterielRegistrationByItemCode")),
            @Result(property = "gtin", column = "spe8gtin")
    })
    List<Materiel> findMaterielByMaterielCode(@Param("materielCode") String materielCode);

    @Select("")
    List<Materiel> findMaterielByCustom(String code);

    @Select("select splitm,spe8cjwlbm,zze8zzbm,zzexdj from V_F4101_FE84101Z where spe8cjwlbm = #{materielCode}")
    @Results(id = "findMaterielRegistrationByItemCode", value = {
            @Result(property = "registrationCode", column = "zze8zzbm"),
            @Result(property = "registrationDate", column = "zzexdj"),
            @Result(property = "itemCode", column = "splitm"),
            @Result(property = "materielCode", column = "spe8cjwlbm")
    })
    List<MaterielRegistration> findMaterielRegistrationByItemCode(@Param("materielCode") String materielCode);

    @SelectProvider(type = JdeMaterielMapper.SqlProvider.class, method = SqlProvider.DELIVERY_ORDER_OF_SQL)
    @Results(id = "getDeliveryOrder", value = {
            @Result(property = "orderId", column = "order_id"),
            @Result(property = "orderType", column = "order_type"),
            @Result(property = "companyCode", column = "company_code"),
            @Result(property = "createDate", column = "order_date", javaType = Date.class),
            @Result(property = "customerCode", column = "customer_code"),
            @Result(property = "customerSpec", column = "customer_spec"),
            @Result(property = "saler", column = "saler")
    })
    /**
     * 查询采购订单缩略信息
     */
    List<DeliveryOrderDetail> getDeliveryOrder(@Param("order") DeliveryOrderDetail order);

    /**
     * 根据订单id，订单类型，公司编码获取订单详情
     *
     * @param orderId
     * @param orderType
     * @param companyCode
     * @return
     */
    @Select("select SDKCOO,SDDOCO,SDDCTO,SDLNID,SDSFXO,SDMCU,SDCO,SDOKCO,SDOORN,SDOCTO,SDOGNO,SDRKCO,SDRORN,SDRCTO,SDRLLN,SDDMCT,SDDMCS,SDAN8,SDSHAN,SDPA8," +
            "SUBSTR(SDDRQJ + 1900000, 5, 3) - 1 +  TO_DATE(SUBSTR(SDDRQJ + 1900000, 1, 4) || '0101', 'yyyymmdd') SDDRQJ,SDTRDJ,SDPDDJ,SDADDJ,SDIVD,SDCNDJ,SDDGL,SDRSDJ,SDPEFJ,SDPPDJ,SDVR01,SDVR02,SDITM,SDLITM,SDAITM,SDLOCN,SDLOTN,SDFRGD,SDTHGD,SDFRMP,SDTHRP,SDEXDP,SDDSC1,SDDSC2,SDLNTY,SDNXTR,SDLTTR,SDEMCU,SDRLIT,SDKTLN,SDCPNT,SDRKIT,SDKTP,SDSRP1,SDSRP2,SDSRP3,SDSRP4,SDSRP5,SDPRP1,SDPRP2,SDPRP3,SDPRP4,SDPRP5,SDUOM,SDUORG,SDSOQS,SDSOBK,SDSOCN,SDSONE,SDUOPN,SDQTYT,SDQRLV,SDCOMM,SDOTQY,SDUPRC,SDAEXP,SDAOPN,SDPROV,SDTPC,SDAPUM,SDLPRC,SDUNCS,SDECST,SDCSTO,SDTCST,SDINMG,SDPTC,SDRYIN,SDDTBS,SDTRDC,SDFUN2,SDASN,SDPRGR,SDCLVL,SDCADC,SDKCO,SDDOC,SDDCT,SDODOC,SDODCT,SDOKC,SDPSN,SDDELN,SDTAX1,SDTXA1,SDEXR1,SDATXT,SDPRIO,SDRESL,SDBACK,SDSBAL,SDAPTS,SDLOB,SDEUSE,SDDTYS,SDNTR,SDVEND,SDCARS,SDMOT,SDROUT,SDSTOP,SDZON,SDCNID,SDFRTH,SDSHCM,SDSHCN,SDSERN,SDUOM1,SDPQOR,SDUOM2,SDSQOR,SDUOM4,SDITWT,SDWTUM,SDITVL,SDVLUM,SDRPRC,SDORPR,SDORP,SDCMGP,SDGLC,SDCTRY,SDFY,SDSO01,SDSO02,SDSO03,SDSO04,SDSO05,SDSO06,SDSO07,SDSO08,SDSO09,SDSO10,SDSO11,SDSO12,SDSO13,SDSO14,SDSO15,SDACOM,SDCMCG,SDRCD,SDGRWT,SDGWUM,SDSBL,SDSBLT,SDLCOD,SDUPC1,SDUPC2,SDUPC3,SDSWMS,SDUNCD,SDCRMD,SDCRCD,SDCRR,SDFPRC,SDFUP,SDFEA,SDFUC,SDFEC,SDURCD,SDURDT,SDURAT,SDURAB,SDURRF,SDTORG,SDUSER,SDPID,SDJOBN,SDUPMJ,SDTDAY,SDSO16,SDSO17,SDSO18,SDSO19,SDSO20,SDIR01,SDIR02,SDIR03,SDIR04,SDIR05,SDSOOR,SDVR03,SDDEID,SDPSIG,SDRLNU,SDPMDT,SDRLTM,SDRLDJ,SDDRQT,SDADTM,SDOPTT,SDPDTT,SDPSTM,SDXDCK,SDXPTY,SDDUAL,SDBSC,SDCBSC,SDCORD,SDDVAN,SDPEND,SDRFRV,SDMCLN,SDSHPN,SDRSDT,SDPRJM,SDOSEQ,SDMERL,SDHOLD,SDHDBU,SDDMBU,SDBCRC,SDODLN,SDOPDJ,SDXKCO,SDXORN,SDXCTO,SDXLLN,SDXSFX,SDPOE,SDPMTO,SDANBY,SDPMTN,SDNUMB,SDAAID,SDSPATTN,SDPRAN8,SDPRCIDLN,SDCCIDLN,SDSHCCIDLN,SDOPPID,SDOSTP,SDUKID,SDCATNM,SDALLOC,SDFULPID,SDALLSTS,SDOSCORE,SDOSCOREO,SDCMCO,SDKITID,SDKITAMTDOM,SDKITAMTFOR,SDKITDIRTY,SDOCITT,SDOCCARDNO,SDPMPN,SDPNS" +
            " from v_f4211 t where t.sddoco = #{orderId} and t.sddcto = #{orderType} and t.sdkcoo = #{companyCode}")
    @Results(id = "findDeliveryOrderDetail", value = {
            @Result(column = "SDKCOO", property = "companyCode"), @Result(column = "SDKCOO", property = "orderId"),
            @Result(column = "SDKCOO", property = "orderType"), @Result(property = "createDate", column = "SDDRQJ", javaType = Date.class),
            @Result(column = "SDLNID", property = "lineNumber"), @Result(column = "SDLITM", property = "itemCode"),
            @Result(column = "SDANBY", property = "saler"), @Result(column = "SDAN8", property = "customerCode"),
            @Result(column = "SDDSC1", property = "itemSpec1"), @Result(column = "SDDSC2", property = "itemSpec2"),
            @Result(column = "SDUORG", property = "amount"), @Result(column = "SDUOM", property = "unit"),
//            @Result(column = "", property = ""), @Result(column = "", property = ""),
//            @Result(column = "", property = ""), @Result(column = "", property = ""),
//            @Result(column = "", property = ""), @Result(column = "", property = ""),
//            @Result(column = "", property = ""), @Result(column = "", property = ""),
//            @Result(column = "", property = ""), @Result(column = "", property = "")
    })
    List<DeliveryOrderDetail> findDeliveryOrderDetail(@Param("orderId") String orderId, @Param("orderType") String orderType,
                                                      @Param("companyCode") String companyCode);
}
