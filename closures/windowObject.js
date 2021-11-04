var a=10;
function outer(){
    var b=40;
   
    console.log(a,b);
   var out1=  function ()
    {
        var c=50;
        console.log(c,b,a);
        var out2=function(){
            var d=60;
            console.log(d,c,b,a);
           
        }
        return out2;
    }
   
    return out1;

}
var fun=outer();
fun()();


let ob1={
    a:10,
    d:function(){
        console.log(this);
    }
};

let ob2={
    a:10,
    d:()=> {return(console.log(this))}
 
};
let ob3={
    a:10,
     d(){
        console.log(this);
    }
 
};

