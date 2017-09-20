import EL from 'el'
import Vue from 'vue/dist/vue'
import axios from 'axios'
import moment from 'moment'
//import template from './rfid-write.html!text'
import $ from 'jquery'
var first_code_com = {
  template: '<input id="first-code" class="input-reset ba b--black-20 pa1 mb1 db w-100" type="text" value="0107613323946058" @keyup.13="getMateriel">',
  methods: {
    getMateriel : function(){
      let code = $("#first-code").val();
      axios.get("/meteriel/"+code)
        .then(function (response) {
          let data = response.data;
          if(data.length == 1){
            let materiel = data[0];
            $('#materiel-code').val(materiel.materielCode);
            $('#materiel-name').val(materiel.meterielName);
            $('#item-code').val(materiel.itemCode);
            $('#materiel-specifications').val(materiel.specifications);
            var registrationArray = materiel.registrationList;
            let options = '';
            if(registrationArray.length > 0){
              $('#registration-code').empty();
            }
            for(let i=0;i<registrationArray.length;i++){
              let option = '<option value ="'+registrationArray[0].registrationCode+'" registrationDate="'+moment(registrationArray[0].registrationDate).format("YYYY-MM-DD")+'">'+registrationArray[0].registrationCode+'</option>';
              options = options + option;
              if(i == 0){
                $('#registration-date').val(moment(registrationArray[0].registrationDate).format("YYYY-MM-DD"));
              }
            }
            $('#registration-code').append(options);

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
var monthArray = ["A","B","C","D","E","F","G","H","I","J","K","L"];
var second_code_com = {
  template: '<input id="second-code" class="input-reset ba b--black-20 pa1 mb1 db w-100" type="text" value="111603241721032310AE93E" @keyup.13="onSecondCodeEnter">',
  methods: {
      onSecondCodeEnter : function(e){
        let val = e.target.value;
        EL.log(val);
        //111603241721032310AE93E
        //+1700112334G0511
        //+$$3180610MMHPLN-3
        let typeCode = this.getTypeCode(val);
        EL.log(typeCode);
        if(typeCode == "gs1"){
          this.parseGs1SecondCode(val);
        }else if(typeCode == "hibc"){
          this.parseHibcSecondCode(val);
        }
      },
      getTypeCode : function(data){
          if(data.indexOf("+") == 0){
            return "hibc";
          }else if(data.indexOf("11") == 0 || data.indexOf("17") == 0){
            return "gs1";
          }else{
            return "custom";
          }
      },
      parseGs1SecondCode(e){
        if(e.indexOf("11") == 0){
          //alert(e.substring(2,8));
          let createDate = moment("20" + e.substr(2,6)).format("YYYY-MM-DD");
          if(e.substring(8,10) == "17"){
            let invalidDate = moment("20" + e.substr(10,6)).format("YYYY-MM-DD");
            $('#expiry-date').val(invalidDate);
          }
          if(e.substr(16,2) == "10"){
            $('#item-lot').val(e.substring(18));
          }
          $('#create-date').val(createDate);
          //alert(d1);
        }
      },
      parseHibcSecondCode(e){
        let year = 0;
        if(e.substr(1,2) == "$$"){
          $("#expiry-date").val("20" + e.substr(4,2) + "-" + e.substr(6,2) + "-" + e.substr(8,2));
          $("#item-lot").val(e.substring(10,e.length-2));
        }else{
          let date = "20" + e.substr(1,2) + "-01-01";
          let millSeconds = new Date(date).getTime() + (parseFloat(e.substr(3,3))-1) * 24 * 3600 * 1000;
          let invalidDate = new Date(millSeconds);
          let monthOfCreateDate = e.substr(e.length-5,1);
          let yearOfCreateDate = "20" + e.substr(e.length-4,2);
          $('#create-date').val(yearOfCreateDate + "-" + this.letterToMonth(monthOfCreateDate));
          $('#expiry-date').val(moment(invalidDate).format("YYYY-MM-DD"));
          $('#item-lot').val(e.substring(7,e.length-5));
        }
      },
      letterToMonth(letter){
        for(let i=0;i<monthArray.length;i++){
          if(letter == monthArray[i]){
            if(i < 10){
              return "0" + (i+1);
            }else{
              return i + 1;
            }

          }
        }
      }
    }
}
let registration_code_com = {
  template : '<select id="registration-code" class="ba b--black-20 pa1 mb1 db w-100" @change="changeRegistration"><option value="">请选择</option></select>',
  methods:{
    changeRegistration : function(e){
      let index = e.target.selectedIndex;
      let registration_date = $('#registration-code option:eq('+index+')').attr("registrationDate");
      $('#registration-date').val(registration_date);
    }
  }
}
new Vue({
  el: '#t-content',
  components:{
    'el-first-code' : first_code_com,
    'el-second-code' : second_code_com,
    'el-registration-code' : registration_code_com
  }
})
let open_rfid_com = {
  template: '<a class="f6 link dim ba ph3 pv2 ma2 mb2 dib white bg-green" href="#0" @click="openRfid">开始</a>',
  methods: {
    openRfid : function(){
      rfidutil.connection("openRfidCallBack");
    }
  }
}
let close_rfid_com = {
  template: '<a class="f6 link dim ba ph3 pv2 ma2 mb2 dib white bg-red" href="#0" @click="closeRfid">结束</a>',
  methods: {
    closeRfid : function(){
      rfidutil.Disconnection();
    }
  }
}
let read_rfid_com = {
  template: '<a class="f6 link dim ba ph3 pv2 ma2 mb2 dib dark-gray" href="#0" @click="readRfid">读标签</a>',
  methods: {
    readRfid : function(){
      rfidutil.ReadRfidData("readCallBack");
    }
  }
}
let write_rfid_com = {
  template: '<a class="f6 link dim ba ph3 pv2 ma2 mb2 dib mid-gray" href="#0" @click="writeRfid">写标签</a>',
  methods: {
    writeRfid : function(){
      let i = $('#detail_table .lh-copy tr:last td:first').html();
      if(!i){
        i = 0;
      }
      let trs = '<tr>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+(parseFloat(i)+1)+'</td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#materiel-code').val()+
            '<input type="hidden" name="f.materielCode" value="'+$('#materiel-code').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#item-lot').val()+
            '<input type="hidden" name="f.lot" value="'+$('#item-lot').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#create-date').val()+
            '<input type="hidden" name="f.createDate" value="'+$('#create-date').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#expiry-date').val()+
            '<input type="hidden" name="f.expiryDate" value="'+$('#expiry-date').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#item-gtin').val()+
            '<input type="hidden" name="f.gtin" value="'+$('#item-gtin').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#single-epc').val()+
            '<input type="hidden" name="f.epc" value="'+$('#single-epc').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#single-tid').val()+
            '<input type="hidden" name="f.tid" value="'+$('#single-tid').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#item-code').val()+
            '<input type="hidden" name="f.itemCode" value="'+$('#item-code').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#materiel-specifications').val()+
            '<input type="hidden" name="f.specifications" value="'+$('#materiel-specifications').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#registration-code').val()+
            '<input type="hidden" name="f.registrationCode" value="'+$('#registration-code').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#registration-date').val()+
            '<input type="hidden" name="f.registrationExpiryDate" value="'+$('#registration-date').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#first-code').val()+
            '<input type="hidden" name="f.firstCode" value="'+$('#first-code').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#second-code').val()+
            '<input type="hidden" name="f.secondCode" value="'+$('#second-code').val()+
          '"></td>'+
          '<td class="pv3 pr1 bb b--black-20 w-10">'+$('#third-code').val()+
            '<input type="hidden" name="f.thirdCode" value="'+$('#third-code').val()+
          '"></td>'+
          '<input type="hidden" name="f.status" value="0"></td>'+
          '</tr>';
          $('#detail_table .lh-copy').append(trs);
    }
  }
}
let submit_rfid_com = {
  template: '<a class="f6 link dim ba ph3 pv2 ma2 mb2 dib mid-gray" href="#0" @click="submitRfids" id="submit-button">提交</a>',
  methods: {
    submitRfids : function(){
      let json =  this.formToJson('rfid-form');
      let len = $('#detail_table .lh-copy input').length;
      if(len == 0){
        alert("请写标签");
        return false;
      }
      axios.post('/rfids',{}, {
          data : {json},
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          transformRequest: [function (data) {
              return data.json;
            }],
      }).then(function (response) {
          if(response.status == "200"){
            $('#detail_table .lh-copy').empty();
            alert("提交成功！");
            return false;
          }
      }).catch(function (error) {
          console.log(error);
      });
    },
    formToJson : function(formid){
      let array = $('#rfid-form').serializeArray();
      let jsonObject = {};
      let jsonArray = [];
      let json = {};
      let amount = 0;
      let i_amount = 0;
      $.each(array,function(i,filed){
        if(filed.name.indexOf(".") > 0){
          amount = amount + 1;
        }
      })
      $.each(array,function(i,filed){
        let name = filed.name;
        let value = filed.value;
        if(name.indexOf(".") > 0){
          i_amount = i_amount + 1;

          if(i_amount == amount ){
            jsonArray.push(json);
          }else if(json[name.substring(name.indexOf(".")+1)]){
            jsonArray.push(json);
            json = {};
          }
            json[name.substring(name.indexOf(".")+1)] = value;

        }else{
          jsonObject[name] = value;
        }
      })
      jsonObject["list"] = jsonArray;
      //return jsonArray;
      //return  JSON.stringify(jsonArray);
      return  JSON.stringify(jsonObject);
    }
  }
}
new Vue({
  el: '#button-div',
  components:{
    'el-open-rfid' : open_rfid_com,
    'el-close-rfid' : close_rfid_com,
    'el-read-rfid' : read_rfid_com,
    'el-write-rfid' : write_rfid_com,
    'el-submit-rfid' : submit_rfid_com
  }
})
let jessonId = getCookie("JSESSIONID");
let e1AppState = getCookie("e1AppState");
axios.get('/jde/user',{
  parames : {
    jessonId : jessonId,
    e1AppState : e1AppState
  }
}).then(function (response) {
    console.log(response);
      }).catch(function (error) {
          console.log(error);
      });
