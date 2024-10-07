const express=require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs")
const app=express();
const port=2024;

//middleware -plugin
app.use(express.urlencoded({extended:false}));

app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.get("/users",(req,res)=>{
    const html=`
    <ul>
       ${users.map((user)=>`<li> ${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})
app.route("/api/users/:id")
  .get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
  })
  .put((req,res)=>{ return res.json({status : "pending"})})
  .patch((req,res)=>{
    const body=req.body;
    const id=Number(req.params.id);
   // console.log(body);
    
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
  .delete((req,res)=>{ 
    const id=Number(req.params.id);
    if(id>0)
      { 
       // users.pop(users[id-1]);
       const filteredUsers = users.filter(user => user.id !== id);
       for(let i=id-1;i<filteredUsers.length;i++)
       {
        filteredUsers[i]={...filteredUsers[i],id:i+1};
       }
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(filteredUsers,null,2),(err,data)=>{
          return res.json({status : "success",id:id})
        });

      }
      else{
        return res.json({status : "user not found"})
      }
  })

app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
      return res.json({status : "success",id:users.length})
    });
})
// app.patch("/api/users/:id",(req,res)=>{
//     return res.json({status : "pending"})
// });
// app.delete("/api/users/:id",(req,res)=>{
//     return res.json({status : "pending"})
// })

app.listen(port,()=>console.log(`server started at port:${port} `))