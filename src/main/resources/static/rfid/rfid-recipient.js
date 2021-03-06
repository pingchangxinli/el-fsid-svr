import Vue from 'vue/dist/vue'
import template from './rfid-recipient.html!text'
import axios from 'axios'
import $ from 'jquery'

let elButtonQuery = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="查询" @click="query">',
    methods: {
      query : function(){
        let orderId = $('#order-id').val();//采购订单号
        let orderType = $('#order-type').val();//订单类型
        let storeHouse = $('#store-house').val();//分布场所
        let supplierCode = $('#supplier-code').val();//供应商编码
        let itemCode = $('#item-code').val();//商品编码
        if((!orderId || orderId.length == 0) && (!orderType || orderType.length == 0)
         && (!storeHouse || storeHouse.length == 0) && (!supplierCode || supplierCode.length == 0) && (!itemCode || itemCode.length == 0)){
          alert("请输入查询条件");
          return false;
        }
        axios.get('/recipient', {
            params: {
              orderId : orderId ,
              orderType : orderType,
              orderCompany : '00101',
              storeHouse : storeHouse,
              supplierCode : supplierCode,
              itemCode : itemCode
            }
        }).then(function (response) {
            var data = response.data;
            $('#recipient-result tbody').empty();
            for(let d in data){
              let orderId = !data[d].orderId ? "" : data[d].orderId;//订单号
              let orderType = !data[d].orderType ? "" : data[d].orderType;//订单类型
              let orderCompany = !data[d].orderCompany ? "" : data[d].orderCompany;//订单公司
              let orderDate = !data[d].orderDate ? "" : data[d].orderDate;//订单日期
              let supplierCode = !data[d].supplierCode ? "" : data[d].supplierCode;//供应商号
              let batchNumber = !data[d].batchNumber ? "" : data[d].batchNumber;//供应商描述 注：不是该字段，暂时放着
              let storeHouse = !data[d].storeHouse ? "" : data[d].storeHouse;//分布场所（收货仓库）
              let receiveDate = !data[d].receiveDate ? "" : data[d].receiveDate;//请求日期 注：不是该字段，暂时放着
              let promiseDate = !data[d].promiseDate ? "" : data[d].promiseDate;//承诺交货
              let saler = !data[d].saler ? "" : data[d].saler;//业务员
              let receiveAddress = !data[d].receiveAddress ? "" : data[d].receiveAddress;//部门 注：不是该字段，暂时放着
              let trs = '<tr>'+
                '<td class="pa3"><input type="radio" value="'+orderId+'" name="form-radio"></td>'+
                '<td class="pa3" name="orderId">'+orderId+'</td>'+
                '<td class="pa3" name="orderType">'+orderType+'</td>'+
                '<td class="pa3" name="orderCompany">'+orderCompany+'</td>'+
                '<td class="pa3">'+orderDate+'</td>'+
                '<td class="pa3">'+supplierCode+'</td>'+
                '<td class="pa3">'+batchNumber+'</td>'+
                '<td class="pa3">'+storeHouse+'</td>'+
                '<td class="pa3">'+receiveDate+'</td>'+
                '<td class="pa3">'+promiseDate+'</td>'+
                '<td class="pa3">'+saler+'</td>'+
                '<td class="pa3">'+receiveAddress+'</td>'+
                '</tr>';
              $('#recipient-result tbody').append(trs);
            }
        }).catch(function (error) {
            console.log(error);
        });
      }
    }

};

let elButtonDetail = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="查看明细" @click="detail">',
    methods: {
      detail : function(){
        let checkedRadio = $('input[type="radio"]:checked');
        let checkedRadioLen = checkedRadio.length;
        if(checkedRadioLen == 1){
          let orderId = checkedRadio.parents().siblings('td[name="orderId"]').html();
          let orderType = checkedRadio.parents().siblings('td[name="orderType"]').html();
          let orderCompany = checkedRadio.parents().siblings('td[name="orderCompany"]').html();
          document.location.href = "rfid-recipient-detail.html?orderId="+orderId+"&orderType="+orderType+"&orderCompany="+orderCompany;
        }else if(checkedRadioLen == 0){
          alert("请选择一条订单数据");
          return false;
        }else if(checkedRadioLen > 1){
          alert("请勿多选订单！");
          return false;
        }
      }
    }
};

let elButtonBegin = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="开始收货" @click="begin">',
    methods: {
      begin : function(){

        let checkedRadio = $('input[type="radio"]:checked');
        let checkedRadioLen = checkedRadio.length;
        let unitFlag = false;//默认计量单位相等
        let storeHouseLocationFlag = false;//默认库位不为空
        if(checkedRadioLen == 1){
          var r = confirm("是否确定开始收货？")
          if(!r){
            return false;
          }
          let orderId = checkedRadio.parents().siblings('td[name="orderId"]').html();
          let orderType = checkedRadio.parents().siblings('td[name="orderType"]').html();
          let orderCompany = checkedRadio.parents().siblings('td[name="orderCompany"]').html();
          axios.post('/recipientJdeToLocal',{orderId:orderId,orderType:orderType,orderCompany:orderCompany})
          .then(function (response) {
          console.log('==============>>jde待收货明细同步到本地待收货明细',response);
          if(response.data != 1){
             alert("该订单没有明细，请重新选择");
             return;
          }
          axios.get('/localRecipientDetail',{orderId:orderId,orderType:orderType,orderCompany:orderCompany})
            .then(function (response) {
              var data = response.data;
              for(let d in data){
                if(!data[d].storeHouseLocation){//判断明细行库位是否为空
                  storeHouseLocationFlag = true;
                }
                if(data[d].unit != data[d].unit1){//判断采购单明细行上的UOM计量单位是否等于该商品的库存计量单位
                  unitFlag = true;
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          if(!storeHouseLocationFlag){
            alert("该订单明细行存在库位为空的数据，不允许开始收货");
            return;
          }
          if(!unitFlag){
            alert("该订单明细行存在UOM计量单位不等于该商品的库存计量单位，不允许开始收货");
            return;
          }
          document.location.href = "rfid-recipient-submit.html?orderId="+orderId+"&orderType="+orderType+"&orderCompany="+orderCompany;

          }).catch(function (error) {
                    console.log(error);
            });
        }else if(checkedRadioLen == 0){
          alert("请选择一条订单");
          return false;
        }else if(checkedRadioLen > 1){
          alert("请勿多选订单！");
          return false;
        }

      }
    }
};

new Vue({
  el: '#button-div',
  components:{
    'el-button-query' : elButtonQuery,
    'el-button-detail' : elButtonDetail,
    'el-button-begin' : elButtonBegin
  }
})

