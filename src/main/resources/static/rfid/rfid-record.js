import Vue from 'vue/dist/vue'
import template from './rfid-record.html!text'
import axios from 'axios'
import $ from 'jquery'
let elButtonQuery = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="查询" @click="query">',
    methods: {
      query : function(){
        let itemCode = $('#item-code').val();
        let materielCode = $('#materiel-code').val();
        let company = $('#company').val();
        let lot = $('#item-lot').val();
        if((!itemCode || itemCode.length == 0) && (!materielCode || materielCode.length == 0) && (!company || company.length == 0) && (!lot || lot.length == 0)){
          alert("请输入查询条件");
          return false;
        }
        axios.get('/rfid', {
            params: {
              itemCode : itemCode ,
              materielCode : materielCode,
              company : company,
              lot : lot
            }
        }).then(function (response) {
            var data = response.data;
            $('#record-result tbody').empty();
            for(let d in data){
              let company = !data[d].company ? "" : data[d].company;
              let itemCode = !data[d].itemCode ? "" : data[d].itemCode;
              let materielCode = !data[d].materielCode ? "" : data[d].materielCode;
              let specifications = !data[d].specifications ? "" : data[d].specifications;
              let lot = !data[d].lot ? "" : data[d].lot;
              let batchNumber = !data[d].batchNumber ? "" : data[d].batchNumber;
              let tid = !data[d].tid ? "" : data[d].tid;
              let tidId = !data[d].tidId ? "" : data[d].tidId;
              let registrationCode = !data[d].registrationCode ? "" : data[d].registrationCode;
              let status = data[d].status == "VALID" ? "有效" : "无效";
              let trs = '<tr>'+
                '<td class="pa3"><input type="radio" value="'+itemCode+'" name="form-radio"></td>'+
                '<td class="pa3">'+status+'</td>'+
                '<td class="pa3">'+company+'</td>'+
                '<td class="pa3">'+itemCode+'</td>'+
                '<td class="pa3">'+materielCode+'</td>'+
                '<td class="pa3"></td>'+
                '<td class="pa3">'+specifications+'</td>'+
                '<td class="pa3">'+lot+'</td>'+
                '<td class="pa3">'+batchNumber+'</td>'+
                '<td class="pa3">'+tid+'</td>'+
                '<td class="pa3" name="tid-id">'+tidId+'</td>'+
                '<td class="pa3">'+registrationCode+'</td>'+
                '</tr>';
              $('#record-result tbody').append(trs);
            }
        }).catch(function (error) {
            console.log(error);
        });
      }
    }

};
let elButtonUpdate = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="标签更新" @click="update">',
    methods: {
      update : function(){
        let checkedRadio = $('input[type="radio"]:checked');
        let checkedRadioLen = checkedRadio.length;
        if(checkedRadioLen == 1){
          let tidId = checkedRadio.parents().siblings('td[name="tid-id"]').html();
          document.location.href = "rfid-replace.html?tidId="+tidId;
        }else if(checkedRadioLen == 0){
          alert("请选择需要替换的标签");
          return false;
        }else if(checkedRadioLen > 1){
          alert("请勿多选标签！");
          return false;
        }
      }
    }
};
let elButtongCancel = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="标签作废" @click="cancel">',
    methods: {
      cancel : function(){

        let checkedRadio = $('input[type="radio"]:checked');
        let checkedRadioLen = checkedRadio.length;
        if(checkedRadioLen == 1){
          var r=confirm("确定要作废该标签吗？")
          if(!r){
            return false;
          }
          let tidId = checkedRadio.parents().siblings('td[name="tid-id"]').html();
          axios.put('/rfid/' + tidId,{},{
            data:{
              tidId : tidId,
              status : 1
            }
          }).then(function (response) {
            console.log(response);
            let status = response.status;
            if(status == "200"){
              alert("作废成功");
              checkedRadio.parents().siblings('td:eq(0)').html("无效");
            }else{
              alert("作废失败");
              return false;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else if(checkedRadioLen == 0){
          alert("请选择需要替换的标签");
          return false;
        }else if(checkedRadioLen > 1){
          alert("请勿多选标签！");
          return false;
        }

      }
    }
};

new Vue({
  el: '#button-div',
  components:{
    'el-button-query' : elButtonQuery,
    'el-button-update' : elButtonUpdate,
    'el-button-cancel' : elButtongCancel
  }
})

