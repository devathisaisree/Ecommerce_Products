const express= require("express");
const app=express();
const PORT=3000;

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method);
    console.log(req.url);       //middleware(cookies)
    next();
}); 

console.log("working");

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.get("/contact",(req,res)=>{
    res.send("Contact page");
});

app.get("/about",(req,res)=>{
    res.send("About page");
});

/*app.get("*",(req,res)=>{
    res.send("Page Not found");
});*/

app.get("/api/hello",(req,res)=>{
    res.json({
        message:"Hello",                //POST the data into the database(Server)
        ok :"done"
        });
});

app.get("/api/missing",(req,res)=>{
    res.statusCode(400).json({
        message:"Not found"             //mathod chaining
    });
});

app.get("/products/:id",(req,res)=>{
    const productId=req.params.id;      //path parameters
    res.status(200).json({
        id:productId
    });
});

app.get("/users/:userId/orders/:orderId",
    (req,res) => {
        const uId=req.params.userId;
        const oId=req.params.orderId;  //path parameters
        res.status(200).json({
           userId:uId,
           orderId:oId
    });
});

app.post("/api/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    res.status(200).json({
        email:email,
        message:"Login successssful"
    });
});

app.get("/products",(req,res)=>{
    const query=req.query;
    const Category= query.category;
    const maxPrice= query.maxPrice;
    res.json({
        category:Category,
        maxPrice:maxPrice                 //Query parameters
    });                                   //http://localhost:3000/products?category=laptop&maxPrice=50000
});

app.use((req,res)=>{
    res.send("Page not found");
});

app.listen(PORT,()=>{
    console.log(`Server started ont the port: ${PORT}`);
});