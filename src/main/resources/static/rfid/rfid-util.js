  function readCallBack(jsonData){
  if (typeof(jsonData) == "undefined") {
     alert("请放标签");
     return false;
  }
  let data = jsonData.replace(/tid/,"'tid'").replace(/epc/,"'epc'").replace(/usertag/,"'usertag'").replace(/'/g,"\"");
  let json = JSON.parse(data);
  $("#sigle-epc").empty().val(json.epc);
  $("#sigle-tid").empty().val(json.tid);
}

function openRfidCallBack(data){
  if(data != "ok"){
    alert("请重新连接设备");
    return false;
  }
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    }
  }
return ""
}
