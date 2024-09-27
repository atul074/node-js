const http=require("http");
const fs=require("fs")
const url=require("url");
function myHandler(req ,res)
{
      //console.log("new request received");  ctrl+c to close terminal
    //console.log(req.headers);
    if(req.url==="/favicon.ico") return res.end();
    const log=`${Date.now()}: ${req.method}${req.url}New req received\n`;
    const myurl=url.parse(req.url,true);
    console.log(myurl);
    
    fs.appendFile("log.txt",log,(err,data)=>{
          //res.end("hello from server");
          switch(myurl.pathname)
          {
            case "/":
                res.end("home page");
                break;
            case "/about":
                const name=myurl.query.myname;
                res.end(`hii ,${name}`);     //http://localhost:6969/about?myname=atul
                break;
            default:
                res.end("404 not found");        
          }
    });
    //res.end("hello from server");
}
const myserver=http.createServer(myHandler);
myserver.listen(6969,()=>console.log('server started')
)
