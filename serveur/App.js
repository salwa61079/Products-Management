const express = require('express')
var cors = require("cors");

const app = express()
app.use(express.json());

const connectDB = require("./config/connectDB")

require("dotenv").config()

const routeCategory =require("./routes/CategorieRoute")
const routeMarque =require("./routes/MarqueRoute")
const routeVariation =require("./routes/VariationRoute")
const routeModel =require("./routes/ModeleRoute")
const routeCaracteristic =require("./routes/CaracteristiqueRoute")
const routeProduct =require("./routes/ProduitRoute")

connectDB()

app.use("/api/category", routeCategory);
app.use("/api/brand", routeMarque);
app.use("/api/variation", routeVariation);
app.use("/api/model", routeModel);
app.use("/api/caracteristic", routeCaracteristic);
app.use("/api/product", routeProduct);

const port = process.env.PORT || 5000





//configuration cors
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
}

app.listen(port, (err)=>{
    err 
       ? console.log(err)
       :console.log('the server is running on port : '+ port)
})

