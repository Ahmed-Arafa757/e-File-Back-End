const express = require("express");
const app = express();


// Connect to the MongoDB cluster
const mongoose = require("mongoose");
const mongoAtlasUri =
    "mongodb+srv://Ahmed-Arafa:mongodbcluster2@tasks-cluster.x0jy0.mongodb.net/e-FileDB";

(async () => {
    await mongoose.connect(
        mongoAtlasUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    ).then(() => {
        console.log(" Mongoose is connected")
    }).catch(e => {
        console.log(e);
        console.log("could not connect");
    })
})()

const port = process.env.PORT || 3000;      

//middleware
app.use(express.json())

// cross-origin error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

const contactController = require("./controllers/contactController");
const userController = require("./controllers/userController");

contactController(app);
userController(app); 


app.listen(port, () => console.log(`app is listening to PORT ${port}`)); 