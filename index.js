const express=require('express');
const app=new express();
const port=8000;

const cookieParser=require('cookie-parser'); // to get cookie parser modules

const db=require('./config/mongoose'); // connect to database

// to use express router
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
// to set middleware for layout
app.use(express.static('./assets'));
//middleware for static file

app.use(express.urlencoded()); // to read the post data
app.use(cookieParser());// to parse the cookie
//extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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