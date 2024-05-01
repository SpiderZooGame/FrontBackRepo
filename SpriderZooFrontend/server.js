const express = require("express");
const path = require("path");
require("dotenv").config({path: path.join(__dirname,"globalconfigs", ".env")});

const secrets = require("./globalconfigs/constants");
const postData= require("./utils/LoginHelper");
const ResourseRequest= require("./utils/ResourceRequest");

const app = express();

// API endpoint example
app.get("/api/test", (req, res) => {
    const data = {
        message: "Hello from the API!"
    };
    res.json(data);
});

app.get("/user/logged", async (req, res) => {
    let data = await postData(secrets.CLIENT_ID,secrets.CLIENT_SECRET,req.query.code);
    console.log(data);
    const responsestring = data.split("&").map(item => item.split("="));// echo "Access_Token=${secrets.Acess_Token}" > .env
    process.env.ACCESS_TOKEN = responsestring[0][1]; // Store access token
    console.log(process.env.ACCESS_TOKEN);
    
    res.redirect(`/?code=${req.query.code}`);
});

app.get("/oauth/login", async (req, res) => {
    res.redirect(secrets.GITHUB_AUTHCODE_REQUEST);
});

// Serve static files
app.use("/static", express.static(path.resolve(__dirname, "src", "static")));

app.get("/*", async (req, res) => {

    if(process.env.ACCESS_TOKEN){
        // 
        let data = await ResourseRequest("https://api.github.com/user","get",null,{Authorization: "Bearer "+process.env.ACCESS_TOKEN});
        console.log("able to verify everything here: ", data);
    }

    res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
