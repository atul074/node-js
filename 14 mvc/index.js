const express=require("express");
const {connectMongoDb}=require("./connection");
const userRouter=require('./routes/user')
const {logReqRes}=require('./middlewares')
const app=express();
const port=2024;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/test-app-1")
//middleware -plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"))
//routes
app.use("/api/users",userRouter)

app.listen(port,()=>console.log(`server started at port:${port} `))