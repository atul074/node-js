const fs=require("fs");

fs.writeFileSync("./test.txt","hello there");

const result=fs.readFileSync("./test.txt","utf8")
console.log(result);

fs.readFile("./test.txt","utf8",(err,res)=>{
    if(err)
        {
            console.log("error",err);
        }
    else
    {
        console.log(res);
    }    
})

fs.appendFileSync("./test.txt",'hello\n')