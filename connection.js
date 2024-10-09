const mongoose = require("mongoose")

async function connectToMongoDb(url) {
   return mongoose.connect(url)
    .then(() => console.log("Mongo DB Connected"))
    .catch((err) => console.log("Mongo err", err)) 
}
module.exports = {
    connectToMongoDb,
};


