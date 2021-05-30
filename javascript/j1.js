
//Object Inheritance

console.log("2"==2, "2"===2); // true(abstract equality comparision) false(exact equality comparision)
//Point-1

let obj1={
    a:20,
    b:"vikash"
}
let obj4={
    a:20,
    b:"vikash"
}
let obj2=obj1;
let obj3=Object.create(obj1);

console.log(obj1==obj2 , obj1==obj3,obj1==obj4, obj2 , obj3 ); // ans= true, false, false,{a:20,b:"vikash", _proto_}, {_proto_}
// from above it is clear that both method are different ,obj2 point to the same memory location as that of obj1 but obj3 is somewhat different 
//refernece variable of obj4 and obj1 is different

 s1=String("A");
 s2=String("A");

console.log(s1==s2);

let str="Abcd";

class person{
    constructor(name,age)
    {
        this.name=name;
        this.age=age;
        console.log(this);
    }
    isadult(age)
    {
        this.nothing=10;
        if(age>=18)
        {
            return true;
        }
    
            return false;
        
    }
};

 p1=new person("vikash",20);


class student extends person{
    constructor(name,age,grade)
    {
        super(name,age);
        this.grade=grade;
        console.log(this);
    }

};

s1=new student("vikash",20,"A++");
s2=new student("amit",24,"B--");

var hellobutton=document.getElementById('btn');

    console.log(hellobutton);
  
hellobutton.addEventListener('click',function(){
    alert('Hello !');
});

var outerDiv=document.getElementById('outerDiv');
outerDiv.addEventListener('mouseover',function(){
    console.log("mouse over !!");
});

outerDiv.addEventListener('mouseout',function(){
    console.log("mouse out !!");
});

var search=document.getElementById('Search');

  
// search.addEventListener('keypress',function(){
//    console.log('key pressed');
// });

// document.addEventListener('keydown',function(){
//     console.log('key down');
// });

// document.addEventListener('keyup',function(){
//     console.log('key Up ');
// });

document.addEventListener('keypress',function(event){
    console.log('key press',event.keyCode);
});

var p=document.querySelector('#parent');
p.addEventListener('click',function(){
    console.log("parent");

});
var  c=document.querySelector('#child');
c.addEventListener('click',function(e){
    
    console.log("child");
    e.stopPropagation();
    
});