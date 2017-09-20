package com.el.rfid.mapper.rfid;

import com.el.rfid.domain.Rfid;
import com.el.rfid.domain.RfidDetail;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import org.springframework.util.StringUtils;

import java.text.MessageFormat;
import java.util.List;
import java.util.Map;


public interface RfidMaterielMapper {

    @SelectKey(statement = "SELECT seq_rfid.nextval from dual", keyProperty = "rfid.id", before = true, resultType = Integer.class)
    @Insert(value = "insert into rfid (id,operator,operator_name) values(#{rfid.id}, #{rfid.operator},#{rfid.operatorName})")
    Integer saveRfid(@Param("rfid") Rfid rfid);

    class SqlProvider extends SQL {

        private static final String MATERIEL_RFID_OF_SQL = "materielRfidOfSql";

        public String materielRfidOfSql(@Param("rfid") RfidDetail rfidDetail) {
            SELECT("COMPANY,ITEM_CODE,MATERIEL_CODE," +
                    "MATERIEL_SPECIFICATIONS,LOT,BATCH_NUMBER,TID,TID_ID,REGISTRATION_CODE,STATUS");
            FROM("RFID_MATERIEL");
            if (StringUtils.hasText(rfidDetail.getCompany())) {
                WHERE(" COMPANY = #{rfid.company}");
            }
            if (StringUtils.hasText(rfidDetail.getMaterielCode())) {
                WHERE(" MATERIEL_CODE = #{rfid.materielCode}");
            }
            if (StringUtils.hasText(rfidDetail.getItemCode())) {
                WHERE(" ITEM_CODE = #{rfid.itemCode}");
            }
            if (StringUtils.hasText(rfidDetail.getLot())) {
                WHERE(" LOT = #{rfid.lot}");
            }
            if (!StringUtils.isEmpty(rfidDetail.getTidId()) && rfidDetail.getTidId() > 0) {
                WHERE(" TID_ID = #{rfid.tidId}");
            }
            return toString();
        }

        private static final String UPDATE_MATERIAL_RFID_OF_SQL = "updateMaterielRfidOfSql";

        public String updateMaterielRfidOfSql(@Param("rfid") RfidDetail rfidDetail) {
            UPDATE("RFID_MATERIEL");
            if (rfidDetail.getStatus() != null) {
                SET(" status = #{rfid.status}");
            }
            if (StringUtils.hasText(rfidDetail.getTid())) {
                SET("tid = #{rfid.tid}");
            }
            if (StringUtils.hasText(rfidDetail.getOriginalTid())) {
                SET("original_tid = #{rfi.originalTid}");
            }
            WHERE(" tid_id = #{rfid.tidId}");
            return toString();
        }
    }


    class InsertSqlProvier {
        public String batchInsert(Map map) {
            List<RfidDetail> list = (List<RfidDetail>) map.get("list");
            StringBuffer sb = new StringBuffer();
            sb.append("insert all into rfid_materiel ").append("(create_date,epc,expiry_date,")
                    .append("first_code,gtin,item_code,lot,")
                    .append("materiel_code,registration_code,registration_expiry_date,")
                    .append("second_code,MATERIEL_SPECIFICATIONS,third_code,status,tid)");
            MessageFormat mf = new MessageFormat("(select #'{'list[{0}].createDate}, #'{'list[{0}].epc}," +
                    "#'{'list[{0}].expiryDate}, #'{'list[{0}].firstCode}," +
                    "#'{'list[{0}].gtin}, #'{'list[{0}].itemCode}," +
                    "#'{'list[{0}].lot}, #'{'list[{0}].materielCode}," +
                    "#'{'list[{0}].registrationCode}, #'{'list[{0}].registrationExpiryDate}," +
                    "#'{'list[{0}].secondCode}, #'{'list[{0}].specifications}," +
                    "#'{'list[{0}].thirdCode}," +
                    "#'{'list[{0}].status}, #'{'list[{0}].tid} from dual) ");
            for (int i = 0; i < list.size(); i++) {
                sb.append(mf.format(new Object[]{i}));
                if (i < list.size() - 1) {
                    sb.append(" union all ");
                }
            }

            return sb.toString();
        }
    }

    @InsertProvider(type = InsertSqlProvier.class, method = "batchInsert")
    void batchInsert(@Param("list") List<RfidDetail> list);

    @Insert({
            "insert into rfid_materiel (create_date,epc,expiry_date," +
                    "first_code,gtin,item_code," +
                    "lot,materiel_code,registration_code," +
                    "registration_expiry_date,second_code,MATERIEL_SPECIFICATIONS," +
                    "third_code,tid) " +
                    "values" +
                    " (#{createDate},#{epc},#{expiryDate}," +
                    "#{firstCode},#{gtin},#{itemCode}," +
                    "#{lot},#{materielCode},#{registrationCode}," +
                    "#{registrationExpiryDate},#{secondCode}," +
                    "#{specifications},#{thirdCode},#{tid})"
    })
    public Integer insertRfid(RfidDetail rfidDetail);

    @SelectProvider(type = SqlProvider.class, method = SqlProvider.MATERIEL_RFID_OF_SQL)
    @Results(id = "queryMaterielRfid", value = {
            @Result(column = "ITEM_CODE", property = "itemCode"),
            @Result(column = "MATERIEL_CODE", property = "materielCode"),
            @Result(column = "MATERIEL_SPECIFICATIONS", property = "specifications"),
            @Result(column = "LOT", property = "lot"),
            @Result(column = "BATCH_NUMBER", property = "batchNumber"),
            @Result(column = "TID", property = "tid"),
            @Result(column = "TID_ID", property = "tidId"),
            @Result(column = "REGISTRATION_CODE", property = "registrationCode")

    })
    public List<RfidDetail> queryMaterielRfid(@Param(value = "rfid") RfidDetail rfidDetail);

    @UpdateProvider(type = SqlProvider.class, method = SqlProvider.UPDATE_MATERIAL_RFID_OF_SQL)
    Integer updateMaterielRfid(@Param("rfid") RfidDetail rfidDetail);
    //@Update(value = "update rfid_materiel set original_tid = #{originalTid},tid = #{tid} where tid_id = #{tidId}")
    //Integer updateMaterielRfid(@Param("tidId") Integer tidId,@Param("originalTid") String originalTid,@Param("tid") String tid);
}
