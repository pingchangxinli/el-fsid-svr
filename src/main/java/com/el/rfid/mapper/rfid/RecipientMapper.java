package com.el.rfid.mapper.rfid;

import com.el.rfid.domain.RecipientDetailDomain;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import org.springframework.util.StringUtils;

import java.util.List;

public interface RecipientMapper {
    class SqlProvider extends SQL {

        //获取Local待收货订单明细
        private static final String LOCAL_RECIPIENT_DETAIL_OF_SQL = "localRecipientDetailOfSql";

        public String localRecipientDetailOfSql(@Param("recipientDetail") RecipientDetailDomain recipientDetailDomain) {
            SELECT("order_id as orderId");
            SELECT("order_type as orderType");
            SELECT("order_company as orderCompany");
            SELECT("line_number as lineNumber");
            SELECT("store_house as storeHouse");
            SELECT("order_amount as orderAmount");
            SELECT("unit as unit");
            SELECT("store_house_location as storeHouseLocation");
            SELECT("batch_number as batchNumber");
            SELECT("supplier_code as supplierCode");
            SELECT("item_code as itemCode");
            SELECT("order_date as orderDate");
            SELECT("promise_date as promiseDate");
            SELECT("operator as operator");
            SELECT("saler as saler");
            SELECT("short_item_code as shortItemCode");
            SELECT("previous_status as previouStatus");
            SELECT("next_status as nextStatus");
            SELECT("last_status as lastStatus");
            SELECT("received_amount as receivedAmount");
            SELECT("uncollected_amount as uncollectedAmount");
            SELECT("receive_date as receiveDate");
            SELECT("receive_address as receiveAddress");
            SELECT("unit1 as unit1");
            FROM("RECIPIENT_DETAIL");
            if (StringUtils.hasText(recipientDetailDomain.getOrderId())) {
                WHERE(" order_id = #{recipientDetail.orderId}");
            }
            if (StringUtils.hasText(recipientDetailDomain.getOrderType())) {
                WHERE(" order_type = #{recipientDetail.orderType}");
            }
            if (StringUtils.hasText(recipientDetailDomain.getOrderCompany())) {
                WHERE(" order_company = #{recipientDetail.orderCompany}");
            }
            return toString();
        }

    }

    /**
     * 获取待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    @SelectProvider(type = SqlProvider.class, method = SqlProvider.LOCAL_RECIPIENT_DETAIL_OF_SQL)
    public List<RecipientDetailDomain> getLocalUnrecipientDetail(@Param(value = "recipientDetail") RecipientDetailDomain recipientDetailDomain);


    /**
     * 将JDE中待收款明细更新到local待收货明细
     * @param record
     * @return
     */
    @Insert({
            "insert into RECIPIENT_DETAIL (ID, order_id, ",
            "order_type, order_company, ",
            "line_number, store_house, ",
            "order_amount, unit, ",
            "store_house_location, batch_number, ",
            "supplier_code, item_code, ",
            "order_date, promise_date, ",
            "operator, saler, ",
            "short_item_code, previous_status, ",
            "next_status, last_status, ",
            "received_amount, uncollected_amount, ",
            "receive_date, receive_address, unit1 ) ",
            "values (#{id,jdbcType=DECIMAL}, #{orderId,jdbcType=DECIMAL}, ",
            "#{orderType,jdbcType=VARCHAR}, #{orderCompany,jdbcType=VARCHAR}, ",
            "#{lineNumber,jdbcType=DECIMAL}, #{storeHouse,jdbcType=VARCHAR}, ",
            "#{orderAmount,jdbcType=DECIMAL}, #{unit,jdbcType=VARCHAR}, ",
            "#{storeHouseLocation,jdbcType=VARCHAR}, #{batchNumber,jdbcType=VARCHAR}, ",
            "#{supplierCode,jdbcType=DECIMAL}, #{itemCode,jdbcType=VARCHAR}, ",
            "#{orderDate,jdbcType=DECIMAL}, #{promiseDate,jdbcType=DECIMAL}, ",
            "#{operator,jdbcType=VARCHAR}, #{saler,jdbcType=DECIMAL}, ",
            "#{shortItemCode,jdbcType=VARCHAR}, #{previouStatus,jdbcType=VARCHAR}, ",
            "#{nextStatus,jdbcType=VARCHAR}, #{lastStatus,jdbcType=VARCHAR}, ",
            "#{receivedAmount,jdbcType=DECIMAL}, #{uncollectedAmount,jdbcType=DECIMAL}, ",
            "#{receiveDate,jdbcType=DECIMAL}, #{receiveAddress,jdbcType=VARCHAR}, #{unit1,jdbcType=VARCHAR})"
    })
    @SelectKey(statement = "SELECT SEQ_RECIPIENT_DETAIL.NEXTVAL FROM DUAL", keyProperty = "id", before = true, resultType = Long.class)
    int insertLocalRecipientDetail(RecipientDetailDomain record);


    @Delete({
            "delete from RECIPIENT_DETAIL",
            "where order_id = #{orderId} and order_type = #{orderType} and order_company = #{orderCompany}"
    })
    int deleteLocalRecipientDetail(RecipientDetailDomain recipientDetailDomain);

}
