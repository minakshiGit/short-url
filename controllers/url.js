const shortid = require('shortid');
const URL = require("../models/url")
async function handleGenerateNewShortURL(req,res) {
    const body = req.body
    const shortId = shortid()
    
    if(!body.url) return res.status(404).json({error:'URL is required'})
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    return res.json({id:shortId})
}
async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory
    })
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}