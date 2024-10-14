const express=require("express");
const path=require('path')
const urlRoute=require('./routes/url');
const staticroutes=require('./routes/staticrouter');
const{connectToMongoDb}=require("./connect")
const URL=require('./models/url')
const app=express();
const PORT=8001;

connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>{console.log('mongodb connected')})


app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use('/url',urlRoute);
app.use('/',staticroutes);
app.get("/test",async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{
        urls:allurls,
    })
})


app.listen(PORT,()=>console.log(`server started at port ${PORT}`))