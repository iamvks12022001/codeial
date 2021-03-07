const express=require('express');
const app=new express();
const port=8000;

// to use express router

app.use('/',require('./routes'));// bydefault it require ./routes/index.js

// set up view engine  
app.set('view engine','ejs');//to set key view engine as ejs
app.set('views','./views');// we can also use path join here


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running in the port no :${port}`);
});