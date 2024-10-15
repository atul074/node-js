//const {nanoid}=require("nanoid")
const shortid=require("shortid");
const URL=require('../models/url')
async function handleGenerateShortURL(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortId=shortid();
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });
    return res.render('home',{id:shortId,});
   
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

async function handleredirect(req,res){
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate(
        {
        shortId
        },
        {$push:{
            visitHistory:{timestamp:Date.now(),},
            },
        }
    );
   // console.log(URL);
    
    console.log(entry);
    
    res.redirect( entry.redirectURL);
}
module.exports={
    handleGenerateShortURL,
    handleGetAnalytics,
    handleredirect,
}