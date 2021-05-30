// let a=10;
// console.log(a);
// let b=[1,2,3];
// console.log(b);
// console.log("Hello World");

function abc(){
    
    {
         a=10
        console.group("IN",a);
    }
    console.group("OUT",a);
};
abc();
console.group("GLOBAL",a);

let sqr=function(n,m){
    console.log("second",n,m);
}
sqr(34,78);

let ar=["Apple","green","blue","pink"];
console.log(ar);
for(let i=0;i<ar.length;i++){
    console.log(ar[i]);
}
console.log(ar["length"]);
ar.push("Ban");
console.log(ar);

console.log(ar.indexOf("Ban"));
ar.pop();
console.log(ar);
ar.shift();
console.log(ar);
ar.unshift('black');
console.log(ar);

bird={
    name:"Vikash",
    surname:"Kumar",
    list:[1,2,3,4]
};

bird.list.forEach(function(val,idx){
  console.log(val+1,idx);
});

class bx{
 constructor(num,col)
 {
     this.num=num;
     this.col=col;
 };
inc()
 {
     this.num+=1;
 };
};

let a1=new bx(1,"red");
console.log(a1);
a1.inc();
console.log(a1);

for(let ans of bird.list){
    console.log(ans);
}

for(let ans in bird.list)
{
    console.log(ans);
}

var i=0;
for(i=0, j=0;i<5 && j<5;i++,j++)
{
     console.log(i,"->" ,j);
}