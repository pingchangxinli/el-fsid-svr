import Vue from 'vue/dist/vue'
import template from './rfid-delivery.html!text'
import axios from 'axios'
import $ from 'jquery'
import moment from 'moment'
//发货单 头信息
let tableHeadData = '<thead>'+
                    '<tr class="stripe-dark">'+
                      '<th class="fw6 tl pa3 bg-white">选择</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单号</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单类型</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单公司</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单日期</th>'+
                      '<th class="fw6 tl pa3 bg-white">客户号</th>'+
                      '<th class="fw6 tl pa3 bg-white">客户描述</th>'+
                      '<th class="fw6 tl pa3 bg-white">业务员</th>'+
                    '</tr>'+
                    '</thead>';
let deliveryTbody = function(response){
    var data = response.data;
    console.log(data);
    $('#delivery-result tbody').empty();
    let tbody = '<tbody class="lh-copy">';
    let trs = '';
    for(let d in data){
      let customerCode = !data[d].customerCode ? "" : data[d].customerCode;
      let customerSpec = !data[d].customerSpec ? "" : data[d].customerSpec;
      let orderId = !data[d].orderId ? "" : data[d].orderId;
      let orderType = !data[d].orderType ? "" : data[d].orderType;
      let companyCode = !data[d].companyCode ? "" : data[d].companyCode;
      let createDate = !data[d].createDate ? "" : data[d].createDate;
      let saler = !data[d].saler ? "" : data[d].saler;
      trs = trs + '<tr>'+
        '<td class="pa3"><input type="radio" value="'+orderId+'" name="form-radio" @click="changeCondition()"></td>'+
        '<td class="pa3" name="order-id">'+orderId+'</td>'+
        '<td class="pa3" name="order-type">'+orderType+'</td>'+
        '<td class="pa3" name="company-code">'+companyCode+'</td>'+
        '<td class="pa3">'+moment(createDate).format('YYYY-MM-DD')+'</td>'+
        '<td class="pa3">'+customerCode+'</td>'+
        '<td class="pa3">'+customerSpec+'</td>'+
        '<td class="pa3">'+saler+'</td>'+
        '</tr>';
    }
    return tbody + trs + '</tbody>';
}
//发货单 明细信息
let tableDetailHeadData = '<thead>'+
                    '<tr class="stripe-dark">'+
                      '<th class="fw6 tl pa3 bg-white">订单号</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单类型</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单公司</th>'+
                      '<th class="fw6 tl pa3 bg-white">订单日期</th>'+
                      '<th class="fw6 tl pa3 bg-white">行号</th>'+
                      '<th class="fw6 tl pa3 bg-white">商品描述1</th>'+
                      '<th class="fw6 tl pa3 bg-white">商品描述2</th>'+
                      '<th class="fw6 tl pa3 bg-white">数量</th>'+
                      '<th class="fw6 tl pa3 bg-white">计量单位</th>'+
                      '<th class="fw6 tl pa3 bg-white">客户号</th>'+
                      '<th class="fw6 tl pa3 bg-white">客户描述</th>'+
                      '<th class="fw6 tl pa3 bg-white">业务员</th>'+
                    '</tr>'+
                    '</thead>';
let deliveryDetailTbody = function(response){
    var data = response.data;
    console.log(data);
    $('#delivery-result tbody').empty();
    let tbody = '<tbody class="lh-copy">';
    let trs = '';
    for(let d in data){
      let orderId = !data[d].orderId ? "" : data[d].orderId;//订单号
      let orderType = !data[d].orderType ? "" : data[d].orderType;//订单类型
      let companyCode = !data[d].companyCode ? "" : data[d].companyCode;//订单公司
      let createDate = !data[d].createDate ? "" : data[d].createDate;//订单日期
      let lineNumber = !data[d].lineNumber ? "" : data[d].lineNumber;//行号
      let itemSpec1 = !data[d].lineNumber ? "" : data[d].lineNumber;//商品描述1
      let itemSpec2 = !data[d].itemSpec2 ? "" : data[d].itemSpec2;//商品描述2
      let amount = !data[d].amount ? "" : data[d].amount;//数量
      let unit = !data[d].unit ? "" : data[d].unit;//单位
      let customerCode = !data[d].customerCode ? "" : data[d].customerCode;//客户号
      let customerSpec = !data[d].customerSpec ? "" : data[d].customerSpec;//客户描述
      let saler = !data[d].saler ? "" : data[d].saler;//业务员
      trs = trs + '<tr>'+
        '<td class="pa3" name="order-id">'+orderId+'</td>'+
        '<td class="pa3" name="order-type">'+orderType+'</td>'+
        '<td class="pa3" name="company-code">'+companyCode+'</td>'+
        '<td class="pa3">'+createDate+'</td>'+
        '<td class="pa3" name="company-code">'+lineNumber+'</td>'+
        '<td class="pa3" name="company-code">'+itemSpec1+'</td>'+
        '<td class="pa3" name="company-code">'+itemSpec2+'</td>'+
        '<td class="pa3" name="company-code">'+amount+'</td>'+
        '<td class="pa3" name="company-code">'+unit+'</td>'+
        '<td class="pa3">'+customerCode+'</td>'+
        '<td class="pa3">'+customerSpec+'</td>'+
        '<td class="pa3">'+saler+'</td>'+
        '</tr>';
    }
    return tbody + trs + '</tbody>';
}
//整合发货单table 展示
let tableData = function(thead,tbody){
    return '<div class="outline bg-white pv2 overflow-auto"  ><table class="f6 w-100 center" cellspacing="0">'+
            thead +
            tbody +
            '</table></div>';
}

//http://localhost:9000/rfid/rfid-delivery.html?companyCode=00101
let url = window.location.href;
let param = url.indexOf("?") == -1 ? '' : url.substring(url.indexOf("?"));
axios.get('/rfid/deliveryOrder'+param)
  .then(function (response) {
    let tbody = deliveryTbody(response);
    console.log(tbody);
    let data = tableData(tableHeadData,tbody);
    $('#delivery-result').empty();
    $('#delivery-result').append(data);
  })
  .catch(function (error) {
    console.log(error);
  });

let elButtonQuery = {
    template: '<input class="b ph1 pv1 ma1 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="查询" @click="query">',
      methods: {
        query : function(){
          axios.get('/rfid/deliveryOrder',{
            params : {
              orderId : $('#order-id').val(),
              orderType : $('#order-type').val(),
              companyCode : $('#company-code').val(),
              itemCode : $('#item-code').val(),
              customerCode : $('#customer-code').val()
            }
          }).then(function(response){
            let tbody = deliveryTbody(response);
            let table = tableData(tableHeadData,tbody);
            $('#delivery-result').empty();
            $('#delivery-result').append(table);
          }).catch(function(e){
          });
        }
      }
};
let elButtonDetail = {
  template: '<input class="b ph1 pv1 ma1 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="订单明细" @click="queryDetail">',
    methods: {
      queryDetail : function(){
        var radio = $('input[type="radio"]:checked');
        var len = radio.length;
        if(len == 0){
          alert("请选择一笔订单");
          return false;
        }
        let tdSiblings = radio.parent('td');
        let orderId = tdSiblings.siblings('td[name="order-id"]').html();
        let orderType = tdSiblings.siblings('td[name="order-type"]').html();
        let companyCode = tdSiblings.siblings('td[name="company-code"]').html();
        $('#order-id').val(orderId);
        $('#order-type').val(orderType);
        $('#company-code').val(companyCode);
        axios.get('/rfid/deliveryOrderDetail',{
          params : {
            orderId : orderId,
            orderType : orderType,
            companyCode : companyCode,
          }
        }).then(function(response){
          let body = deliveryDetailTbody(response);
          let table = tableData(tableDetailHeadData,body);
          $('#delivery-result').empty();
          $('#delivery-result').append(table);
        }).catch(function(e){
        });
      }
    }
};
let elButtonDelivery = {
  template: '<input class="b ph1 pv1 ma1 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="发货" @click="queryDetail">',
    methods: {
      queryDetail : function(){
        axios.get('/rfid/deliveryOrder',{
          params : {
            orderId : $('#order-id').val(),
            orderType : $('#order-type').val(),
            companyCode : $('#company-code').val(),
            itemCode : $('#item-code').val(),
            customerCode : $('#customer-code').val()
          }
        }).then(function(response){
          deliveryTbody(response);
        }).catch(function(e){
        });
      }
    }
};
new Vue({
  el: '#button-div',
  components:{
    'el-button-query' : elButtonQuery,
    'el-button-detail' : elButtonDetail,
    'el-button-delivery' : elButtonDelivery
  }
})

