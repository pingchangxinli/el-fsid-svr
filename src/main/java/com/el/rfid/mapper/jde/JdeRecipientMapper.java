package com.el.rfid.mapper.jde;

import com.el.rfid.domain.RecipientDetailDomain;
import com.el.rfid.domain.RecipientDomain;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;
import org.springframework.util.StringUtils;

import java.util.List;

public interface JdeRecipientMapper {

    class SqlProvider extends SQL {

        //获取JDE待收货订单
        private static final String RECIPIENT_OF_SQL = "recipientOfSql";

        public String recipientOfSql(@Param("recipient") RecipientDomain recipientDomain) {
            SELECT("order_id as orderId");
            SELECT("order_type as orderType");
            SELECT("order_company as orderCompany");
            SELECT("store_house as storeHouse");
            SELECT("supplier_code as supplierCode");
            SELECT("order_date as orderDate");
            SELECT("promise_date as promiseDate");
            SELECT("saler as saler");
            SELECT("receive_date as receiveDate");
            SELECT("receive_address as receiveAddress");
            FROM("V_F4301");
            if (StringUtils.hasText(recipientDomain.getOrderId())) {
                WHERE(" order_id = #{recipient.orderId}");
            }
            if (StringUtils.hasText(recipientDomain.getOrderType())) {
                WHERE(" order_type = #{recipient.orderType}");
            }
            if (StringUtils.hasText(recipientDomain.getOrderCompany())) {
                WHERE(" order_company = #{recipient.orderCompany}");
            }
            if (StringUtils.hasText(recipientDomain.getStoreHouse())) {
                WHERE(" store_house = #{recipient.storeHouse}");
            }
            if (StringUtils.hasText(recipientDomain.getItemCode())) {
                WHERE(" item_code = #{recipient.itemCode}");
            }
            if (StringUtils.hasText(recipientDomain.getSupplierCode())) {
                WHERE(" supplier_code = #{recipient.supplierCode}");
            }
            return toString();
        }

        //获取JDE待收货订单明细
        private static final String RECIPIENT_DETAIL_OF_SQL = "recipientDetailOfSql";

        public String recipientDetailOfSql(@Param("recipientDetail") RecipientDetailDomain recipientDetailDomain) {
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
            FROM("V_F4311");
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
     * 获取JDE待收货订单
     *
     * @param recipientDomain
     * @return
     */
    @SelectProvider(type = SqlProvider.class, method = SqlProvider.RECIPIENT_OF_SQL)
    public List<RecipientDomain> getUnrecipient(@Param(value = "recipient") RecipientDomain recipientDomain);

    /**
     * 获取JDE待收货订单明细
     *
     * @param recipientDetailDomain
     * @return
     */
    @SelectProvider(type = SqlProvider.class, method = SqlProvider.RECIPIENT_DETAIL_OF_SQL)
    public List<RecipientDetailDomain> getUnrecipientDetail(@Param(value = "recipientDetail") RecipientDetailDomain recipientDetailDomain);


}
