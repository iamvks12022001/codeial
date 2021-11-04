// //import React from 'react';
// class LikeButton extends React.Component{
//     render(){
//         return(
//             <button>
//                 Like
//             </button>
//         )
//     }
// }
// const app=document.getElementById('app');
// ReactDOM.render(<likeButton />,app);
//import React from 'react';

// function fetchRandomDogimage(){
//     var xheReq=new XMLHttpRequest();//ask for request
//     xheReq.onload=function(){   //function executed after the response
    
//        console.log(xheReq.response);
//        var responseJSON= JSON.parse(xheReq.response);//to convert it into JSON format
//        var imageURL=responseJSON.message; //to get the image url
//        $('#dog-image').attr('src',imageURL); //to set the attribute src

//     };
//      xheReq.onerror=function(){
//          console.log("requested failed")
//      }
//      //when Api called failed
//     xheReq.open('get','https://dog.ceo/api/breeds/image/random',true);
//     //make request
//     xheReq.send();
//     //send request
// }


// function fetchRandomDogimage(){
//     $.ajax({
//         url:'https://dog.ceo/api/breeds/image/random',
//         method:'GET',
//         success:function(data){
//             var imageUrl=data.message; //automatically is in json
//             $('#dog-image').attr('src',imageUrl);
//         }
//     })..fail(function(xhr,textStatus,errorThrown){
//     console.log("REQUESTED FAIL");
// });
// }
// function fetchRandomDogimage(){
//        $.get('https://dog.ceo/api/breeds/image/random',function(data){
//                     var imageUrl=data.message; //automatically is in json
//                     $('#dog-image').attr('src',imageUrl);
//                 }).fail(function(xhr,textStatus,errorThrown){
//                  console.log("REQUESTED FAIL");
//                 });
// }
// $('#fetch-dog-image-button').click(fetchRandomDogimage);
//click event

// class LikeButton extends React.Component{
//     render(){
//         return React.createElement('button',null,'Like');
//     }
// }
// const app=document.getElementById('app1');
// ReactDOM.render(React.createElement(LikeButton),app);

function displayImage(data){
     $('<img>',{
         src:data.url ,
         width:'100',  //create image tag
         height:'100'   
     }).appendTo('#image-container');
}
$.ajax({
    url:'https://api.nasa.gov/planetary/apod?api_key=DEMO_K',
    method:'GET',
    success:displayImage

});