import Vue from 'vue/dist/vue'

let elButtonOpen = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="开始" '
      +'@click="open">',
    methods: {
      open : function(){
        //打开读写器
        rfidutil.connection("openRfidCallBack");
      }
    }
};
let elButtonRead = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="读取新标签" '
      +'@click="read">',
    methods: {
      read : function(){
        rfidutil.ReadRfidData("readCallBack");
      }
    }
};

let elButtonClose = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="结束" '
      +'@click="close">',
    methods: {
      close : function(){
        //打开读写器
        //rfidutil.connection("openRfidCallBack");
        //写入标签

        //关闭读写器
        //rfidutil.Disconnection();
        //根据tid_id修改rfid记录
        alert("hello");
      }
    }
};
const formToJson = function(formid){
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

            }
          })
          jsonObject["list"] = jsonArray;
          //return jsonArray;
          return  JSON.stringify(jsonArray);
          //return  JSON.stringify(jsonObject);
        }
export  default {elButtonOpen,elButtonRead,elButtonClose,formToJson,openRfidCallBack,readCallBack}
