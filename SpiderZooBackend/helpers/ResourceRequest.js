const axios = require("axios");

async function ResourseRequest(url,method, body = null,headers = {}) {
 
    try {
        if(method.toLowerCase() === "post"){
            const response = await axios.post(url,body,{ headers });
            return response.data;
        }else if(method.toLowerCase() === "get"){
            const response = await axios.get(url,{ headers });
            return response.data;
        }else{
            throw new Error("Invalid method. Only post and get allowed");
        }

      } catch (error) {
        console.log("the following error occured: ", error);
        return null;
    }
   
}

module.exports = ResourseRequest;


