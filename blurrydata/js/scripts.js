let data = {};

let pageNum=1;
let country;
let cty = "255";


function xhr(url){

}

const xrh1 = new Promise( function(resolve,reject){
//    let url = "https://ucdpapi.pcr.uu.se/api/gedevents/21.1?pagesize=100&Country="+365+"&StartDate=2014-01-15&EndDate=2015-12-31&TypeOfViolence=1,3";
//    let url = "https://ucdpapi.pcr.uu.se/api/gedevents/21.1?pagesize=100&Country=365,369&StartDate=2014-01-15&EndDate=2015-12-31&TypeOfViolence=1,3";

let url = "https://ucdpapi.pcr.uu.se/api/battledeaths/21.1?pagesize=1000&page="+pageNum+"&Country="+ 700;
// let url = "https://ucdpapi.pcr.uu.se/api/"+"gedevents/21.1?pagesize=1";
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onload = function(){
        if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        }else{
            const error = xhr.statusText;
            reject(error);
        }
    }
});

const button = document.getElementById('GetUsers');
button.addEventListener("click",function(){
    xrh1.then(
        // pageNum++
        function(resp){
            let url = "https://ucdpapi.pcr.uu.se/api/battledeaths/21.1?pagesize=1000&page="+pageNum+"&Country="+ 700;
            let xhr = new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.send();
            xhr.onload = function(){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            }else{
                const error = xhr.statusText;
                reject(error);
            }
        }
        }
    );

    xrh1.catch(
        function(resp){
            console.log('error');
        }
    );
});

