import Vue from 'vue/dist/vue'
import template from './rfid-recipient-detail.html!text'
import axios from 'axios'
import $ from 'jquery'

let url = window.location.href;
let param = url.substring((url.indexOf("?") + 1));
axios.get('/recipientDetail?'+param)
  .then(function (response) {
    var data = response.data;
    for(let d in data){
      if(data[d].orderId){
        $('#order-id').val(data[d].orderId);
      }
      if(data[d].orderType){
        $('#order-type').val(data[d].orderType);
      }
      if(data[d].orderCompany){
        $('#order-company').val(data[d].orderCompany);
      }
      if(data[d].storeHouse){
        $('#store-house').val(data[d].storeHouse);
      }
      if(data[d].supplierCode){
        $('#supplier-code').val(data[d].supplierCode);
      }
      if(data[d].itemCode){
        $('#item-code').val(data[d].itemCode);
      }
    }
    $('#recipient-detail-result tbody').empty();
    for(let d in data){
      let orderId = !data[d].orderId ? "" : data[d].orderId;//订单号
      let orderType = !data[d].orderType ? "" : data[d].orderType;//订单类型
      let orderCompany = !data[d].orderCompany ? "" : data[d].orderCompany;//订单公司
      let lineNumber = !data[d].lineNumber ? "" : data[d].lineNumber;//行号
      let lastStatus = !data[d].lastStatus ? "" : data[d].lastStatus;//上一个状态
      let nextStatus = !data[d].nextStatus ? "" : data[d].nextStatus;//下一个状态
      let supplierCode = !data[d].supplierCode ? "" : data[d].supplierCode;//供应商号
      let batchNumber = !data[d].batchNumber ? "" : data[d].batchNumber;//供应商描述 注：不是该字段，暂时放着
      let receiveAddress = !data[d].receiveAddress ? "" : data[d].receiveAddress;//发运至
      let itemCode = !data[d].itemCode ? "" : data[d].itemCode;//商品编码
      let uncollectedAmount = !data[d].uncollectedAmount ? "" : data[d].uncollectedAmount;//未收数量
      let unit = !data[d].unit ? "" : data[d].unit;//计量单位
      let orderAmount = !data[d].orderAmount ? "" : data[d].orderAmount;//订购数量
      let trs = '<tr>'+
        '<td class="pa3"><input type="radio" value="'+data[d].lineNumber+'" name="form-radio"></td>'+
        '<td class="pa3">'+orderId+'</td>'+
        '<td class="pa3">'+orderType+'</td>'+
        '<td class="pa3">'+orderCompany+'</td>'+
        '<td class="pa3">'+lineNumber+'</td>'+
        '<td class="pa3">'+lastStatus+'</td>'+
        '<td class="pa3">'+nextStatus+'</td>'+
        '<td class="pa3">'+supplierCode+'</td>'+
        '<td class="pa3">'+batchNumber+'</td>'+
        '<td class="pa3">'+receiveAddress+'</td>'+
        '<td class="pa3">'+itemCode+'</td>'+
        '<td class="pa3">'+uncollectedAmount+'</td>'+
        '<td class="pa3">'+unit+'</td>'+
        '<td class="pa3">'+orderAmount+'</td>'+
        '</tr>';
      $('#recipient-detail-result tbody').append(trs);
    }
  })
  .catch(function (error) {
    console.log(error);
  });


let elButtonReturn = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="返回上一页" @click="returnBtn">',
    methods: {
      returnBtn : function(){
        document.location.href = "rfid-recipient.html";
      }
    }
};

new Vue({
  el: '#button-div',
  components:{
    'el-button-return' : elButtonReturn
  }
})

