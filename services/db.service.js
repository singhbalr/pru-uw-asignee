let sdk = require('couch-base');
let sdkCouch = sdk();

exports.getDataByKey = (key, bucket) => new Promise(async (resolve, reject) => {

    try{
        var result = await sdkCouch.cbGetByKey(key, bucket);
        if(result.data && result.data.value)
            resolve({ isSuccess: true, ...result.data.value })  
        else
            resolve({ isSuccess: false, message: "no data found." });                      
    }
    catch(e){
        console.log('error : ', e);
        resolve(false);
    }
    
});

