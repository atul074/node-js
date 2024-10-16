const {getUser} = require('../service/auth')
async function restrictToLoggedinUserOnly(req , res , next){
    //const userUid = req.cookies?.uid;
    const userUid = req.headers["authorization"];

    if(!userUid) return res.redirect("/login");
    //const user = getUser(userUid);
    const token = userUid.split("Bearer ")[1];
    // Bearer jkd2132jk3123
    const user = getUser(token);
    if(!userUid) return res.redirect("/login");

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req , res , next){
    //const userUid = req.cookies?.uid;
    console.log(req.headers);
    const userUid = req.headers["authorization"];
    console.log(userUid);
    const token = userUid.split("Bearer ")[1];

    //const user = getUser(userUid);
    const user = getUser(token);
    req.user = user;
    next();
}

module.exports= {
    restrictToLoggedinUserOnly,
    checkAuth
};