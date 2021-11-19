const express = require("express");
const { notFound, errorHandler } = require("../middlewares/errorHandler.js");
const users = require("./routes/users.js");
const packages = require("./routes/package.js");
const DB_CONNECT = require("./config/db.js");
const dotenv = require("dotenv");
const { resendLink } = require("./controllers/userController.js");
const path = require("path");
const cloudinary = require("cloudinary");
const articles = require("./routes/article.js");
const orders = require("./routes/order");
const app = express();
dotenv.config();
cloudinary.config({
  cloud_name: "dhanush1509",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

DB_CONNECT();
app.use(express.json());
app.use("/api/users", users);
app.post("/api/resendlink", resendLink);
app.use("/api/articles", articles);
app.use("/api/packages", packages);
app.use("/orders", orders);



if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*',(req, res) =>{
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})
}
else{
    app.get('/',(req,res)=>{
res.send('API is running');
    })
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
