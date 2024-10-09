const express = require("express")
const {connectToMongoDb} = require("./connection")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const app = express()
const PORT = 8000
const DBURL = "mongodb+srv://minakshidutta21:NDNfQ2LbZ4tEVb1n@cluster0.sxwqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// connection 
connectToMongoDb(DBURL)
app.use(express.json())
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry =await URL.findOneAndUpdate( 
        {
            shortId
        },
        {
        $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
        },
      }
        
    )
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`))