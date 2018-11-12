var data;

function loaddata(callback){
    var xhr=new XMLHttpRequest();
    xhr.open('get','https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');

    xhr.send();
    xhr.onload=function(){
        data=JSON.parse(xhr.responseText);
        callback();
    }
}

function sel(){
    var lcn={};
    for(var i=0;i<data.length;i++){
        var content=data[i].ZipName_;
        if(lcn[content]==undefined)
        lcn[content]=1;
    }
    
    var lcni=document.querySelector(".lc");
    var stra='';
    stra+='<option value="all">請選擇地區</option>';
    for(var j in lcn){
        stra+='<option value"'+j+'">'+j+'</option>';
    }
    lcni.innerHTML=stra;
    lcni.addEventListener('change',update);

    var stn={};
    for(var i=0;i<data.length;i++){
        var content=data[i].StatusName_;
        if(stn[content]==undefined)
        stn[content]=1;
    }
    
    var stni=document.querySelector(".st");
    var strb='';
    strb+='<option value="all">請選擇狀態</option>';
    for(var j in stn){
        strb+='<option value"'+j+'">'+j+'</option>';
    }
    stni.innerHTML=strb;
    stni.addEventListener('change',update);
}

function update(){
    var lcnin=document.querySelector(".lc");
    var stnin=document.querySelector(".st");
    var cti=document.querySelector(".c");
    var ti=document.querySelector(".t");
    var total=0;
    var strc='';
    for(var i=0;data.length>i;i++){
        if(data[i].ZipName_==lcnin.value&&data[i].StatusName_==stnin.value){
            strc+='<li>'+data[i].BeforeDesc_+'</li>';
            total+=1;
        }
    }
    ti.textContent='在'+lcnin.value+'中有'+total+'筆資料';
    cti.innerHTML=strc;
}

loaddata(sel);