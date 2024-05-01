const axios = require("axios");

const ResourseRequest = require("./ResourceRequest");

async function Authorization(access_token, client_id, client_secret) {

    if(client_id!=process.env.CLIENT_ID){
        return 401; // Unauthorized code
    }

    if(client_secret!=process.env.CLIENT_SECRET){
        return 401; // Unauthorized code
    }
 
    let data = await ResourseRequest(`https://api.github.com/user`,"get",null,{Authorization: "Bearer "+access_token});

    return data.login;
   
}

module.exports = Authorization;


