var userLoggedin=true;
function checkuserLoggedIN(){
var promise=new Promise((resolve,reject)=>{
    //wait for 1 sec
        setTimeout(()=>{
            if(userLoggedin){
                //resolve
            resolve("user is logged in");
            }else{
                //reject
                reject("User not logged in");
            }
        },1000);
    });
    return promise;
}
setTimeout(()=>{
    userLoggedin=false;
},500);

checkuserLoggedIN().then((susMes)=>{
    console.log(susMes);
}).catch((falMes)=>{console.log(falMes)})


