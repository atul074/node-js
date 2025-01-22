const express=require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs")
const mongoose=require("mongoose");
const { required } = require("yargs");
const { timeStamp } = require("console");
const app=express();
const port=2024;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/test-app-1')
        .then(()=>{console.log("mongodb connected")})
        .catch(err=> console.log("Mongo error",err));
//show dbs to show databases
//use test-app-1 to enter into db
//show collections to see all collections
//db.users.find({}) to see tuples
        
//schema
const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  jobTitle:{
    type:String,
  },
  gender:{
    type:String,
  }
},{timestamps:true});

const User=mongoose.model('user', userSchema)
//middleware -plugin
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
  //console.log("hello from middleware");
  req.name="atul";
  //return res.json({msg:"hello end"}) ye control yahi end karega aage nahi jane dega
  fs.appendFile("log.txt",`\n${Date.now()}:${req.method}:${req.path}`
  ,(err,data)=>{
    next();
  })

})
app.use((req,res,next)=>{
 // console.log("hello from middleware 2 ",req.name);
  next();
})

app.get("/api/users",async(req,res)=>{
  const alldbusers=await User.find({});
  res.setHeader('X-myName','atul')  //custom header  X-denote custom header
  console.log(req.headers);
  
    return res.json(alldbusers);
})
app.get("/users",async(req,res)=>{
    const alldbusers=await User.find({});
    const html=`
    <ul>
       ${alldbusers.map((user)=>`<li> ${user.firstName}-${user.email} </li>`).join("")}
    </ul>
    `
    res.send(html);
})
app.route("/api/users/:id")
  .get(async(req,res)=>{
    const id=Number(req.params.id);
    const user=await User.findById(req.params.id);
   // const user=users.find((user)=>user.id===id);
    if(!user) return res.status(404).json({error:"user not found"})
    return res.json(user);
  })
  .put((req,res)=>{ return res.json({status : "pending"})})
  .patch((req,res)=>{
    const body=req.body;
    const id=Number(req.params.id);
   // console.log(body);
    //User.findByIdAndUpdate(req.params.id,{lastName:"kumar"})
    if(id>0)
    { //console.log(users[id-1]);
    
      users[id-1]={...body,id:id};
      fs.writeFile('./MOCK_DATA.json',JSON.stringify(users,null,2),(err,data)=>{
        return res.json({status : "success",id:id})
      });
    }
    else{
      return res.json({status : "user not found"})
    }
   
  })
  .delete(async(req,res)=>{ 
    const id=Number(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "success"})
    // if(id>0)
    //   { 
    //    // users.pop(users[id-1]);
    //    const filteredUsers = users.filter(user => user.id !== id);
    //    for(let i=id-1;i<filteredUsers.length;i++)
    //    {
    //     filteredUsers[i]={...filteredUsers[i],id:i+1};
    //    }
    //     fs.writeFile('./MOCK_DATA.json',JSON.stringify(filteredUsers,null,2),(err,data)=>{
    //       return res.json({status : "success",id:id})
    //     });

    //   }
    //   else{
    //     return res.json({status : "user not found"})
    //   }
  })

app.post("/api/users",async(req,res)=>{
    const body=req.body;
    if(!body || !body.first_name ||!body.email || !body.gender)
      return res.status(400).json({msg:"all fields are required"});
    // users.push({...body,id:users.length+1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //   return res.status(201).json({status : "success",id:users.length})
    // });
    const result=await User.create({
      firstName:body.first_name,
      lastName:body.last_name,
      email:body.email,
      gender:body.gender,
      jobTitle:body.job_title,
    });
    return res.status(201).json({msg : "success"})
})
// app.patch("/api/users/:id",(req,res)=>{
//     return res.json({status : "pending"})
// });
// app.delete("/api/users/:id",(req,res)=>{
//     return res.json({status : "pending"})
// })

app.listen(port,()=>console.log(`server started at port:${port} `))