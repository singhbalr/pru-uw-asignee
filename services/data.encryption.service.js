var crypto = require('crypto');
//let { base64Key, base64IV } = require('../configs/encryption.config');

exports.encryptData = (plainText) => new Promise(async (resolve, reject) => {

    try{

        var base64Key = process.env.ENCRYPTION_KEY;
        var base64IV = process.env.ENCRYPTION_IV;

        const key = Buffer.from(base64Key, 'base64');
        const iv = Buffer.from(base64IV, 'base64');
        const cipher = crypto.createCipheriv(getAlgorithm(base64Key), key, iv);
        let cipherText = cipher.update(plainText, 'utf8', 'base64')
        cipherText += cipher.final('base64');
        resolve(cipherText)  

    }
    catch(e){

        console.log('error : ', e);
        resolve(false);

    }
    
});

function getAlgorithm(base64Key) {
    
    var key = Buffer.from(base64Key, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';
            
    }
    throw new Error('Invalid key length: ' + key.length);

}



