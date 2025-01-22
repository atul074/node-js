const express=require('express');
const {handleGenerateShortURL, handleGetAnalytics,handleredirect}=require('../controllers/url');
const router=express.Router();

router.post('/',handleGenerateShortURL);
router.get('/analytics/:shortId',handleGetAnalytics)
router.get('/:shortId',handleredirect);
module.exports=router;