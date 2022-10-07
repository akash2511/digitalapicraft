'use strict';
const axios = require("axios");

module.exports = async() => {
    try{
        const responses = []
        for(let i = 0; i< 10; i++){
            const response = await axios.get('https://randomuser.me/api/');
            responses.push(response)
        }
        // Since there is rate limiter all the requests cannot be awaited at once
        const users = responses.map(response=> response.data.results[0])
        return users
    }catch(e){
        throw e
    }
}