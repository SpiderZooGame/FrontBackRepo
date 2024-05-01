const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const Authorization = require("./helpers/Authorization");

require("dotenv").config({path: path.join(__dirname,"globalconfigs", ".env")});

const usertest = {
    login: "Farisani-Ratshikombo-BBD"
}

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/users/userinfo", async (req, res) => {

    console.log("headers ", req.headers);

    let githubuser = await Authorization(req.headers.access_token, req.headers.client_id, req.headers.client_secret);
    console.log("the user is: ",githubuser);
    if(githubuser!=401){

        // Check if user in database. Store user if not stored and return user
        if(githubuser === usertest.login){
            return res.json(usertest); // Return user object
        }

    }else{
        res.json({result: "Invalid Credentials"});
    }

});

app.listen(process.env.PORT || 5000, () => console.log("Server started running on Port: ", process.env.PORT || 5000));
