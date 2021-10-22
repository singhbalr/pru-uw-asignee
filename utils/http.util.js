var axios = require('axios');

exports.post = (url, payload, headers) => new Promise(async (resolve, reject) => {

    var config = {
        method: 'post',
        url: url,
        // headers: { 'Content-Type': 'application/json' },
        headers: headers,
        data : payload
    };

    axios(config)
    .then(function (response) {
        resolve(response.data);
    })
    .catch(function (error) {
        console.log(error);
        resolve(false);
    });
    
});