import Vue from 'vue/dist/vue'
import template from './rfid-replace.html!text'
import axios from 'axios'
import $ from 'jquery'
import rfid from './rfid'

let url = window.location.href;
let param = url.substring((url.indexOf("?") + 1));
axios.get('/rfid?'+param)
  .then(function (response) {
    console.log(response);
    var data = response.data;
    for(let d in data){
      console.log(d);
      if(data[d].tid){
        $('#tid').val(data[d].tid);
      }
      if(data[d].tidId){
        $('#tid-id').val(data[d].tidId);
      }
      if(data[d].epc){
        $('#epc').val(data[d].epc);
      }
      if(data[d].registrationCode){
        $('#registration-code').val(data[d].registrationCode);
      }
      if(data[d].itemCode){
        $('#item-code').val(data[d].itemCode);
      }
      if(data[d].materielCode){
        $('#materiel-code').val(data[d].materielCode);
      }
      if(data[d].lot){
        $('#lot').val(data[d].lot);
      }
      if(data[d].specifications){
              $('#materiel-specfications').val(data[d].specifications);
            }
      if(data[d].expiryDate){
        $('#expiry-date').val(data[d].expiryDate);
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });

let elButtonUpdate = {
  template: '<input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="标签更新" @click="update">',
    methods: {
      update : function(){
        let originalTid = $('#original-tid').val();
        let tid = $('#tid').val();
        let tbody = $('#record-result tbody');
        axios.put('/rfid/' + $("#tid-id").val(),{
        },{
          data:{
            tidId : $('#tid-id').val(),
            tid : $('#sigle-tid').val(),
            originalTid : $('#original-tid').val()
          }
        })
          .then(function (response) {
            console.log(response);
            if(response.status != "200"){
              alert("更新失败，请重试");
              return false;
            }else{
              $('#new-status').val("成功");
              alert("更新成功");
              tbody.empty();
              let tr = "<tr>" +
                '<td class="pa3">'+$('#item-code').val()+'</td>' +
                '<td class="pa3">'+$('#materiel-code').val()+'</td>' +
                '<td class="pa3"></td>' +
                '<td class="pa3">'+$('#materiel-specfications').val()+'</td>' +
                '<td class="pa3">'+$('#lot').val()+'</td>' +
                '<td class="pa3">'+$('#sigle-tid').val()+'</td>' +
                '<td class="pa3">'+$('#tid-id').val()+'</td>' +
                '<td class="pa3">'+$('#registration-code').val()+'</td>';
                tbody.append(tr);
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    }
};


new Vue({
  el: '#button-td',
  components:{
    'el-button-open' : rfid.elButtonOpen,
    'el-button-read' : rfid.elButtonRead,
    'el-button-close' : rfid.elButtonClose,
    'el-button-update' : elButtonUpdate
  }
})
