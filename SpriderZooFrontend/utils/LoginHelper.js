const axios = require("axios");

async function postData(clientID,clientSecret,requestToken) {
    let data;
    try {
        const response = await axios.get(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`);
        
        return response.data;
        
      } catch (error) {
        console.log("the following error occured: ", error);
        data = null;
      }
   return data;
}

module.exports = postData;


