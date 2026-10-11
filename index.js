const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Routes
const productsRoutes = require("./routes/product");
const authRoutes=require("./routes/auth");

const errorhandler=require("./middleware/errorhandler");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req,res,next)=>{
    console.log(req.method);
    console.log(res.url);

    next();
});

app.use("/auth",authRoutes);
app.use("/products", productsRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    })
})

app.use(errorhandler);

app.listen(PORT, () => {
    connectDB();
    console.log("server listening on " + PORT);
})

//Vz1d6QFgvTAYzTne
//devathisaisree_db_user