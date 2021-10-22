// /etc/secrets/<path>/<key>
var fs = require('fs');

exports.getSecretValue = (path, key) => {
   
    try{
        var secretPath = '/etc/secrets/' + path ;
        var secretFile = secretPath + '/' +key;

        var content;
        console.log('Loading secret from /etc/secrets/');
        console.log('');


        if(fs.existsSync(secretFile)){
            content = fs.readFileSync(secretFile,'utf8').trim();
            console.log('fetch key : ', key,' in path ', path)
        }

        console.log('');
        console.log('Loading secrets complete.');
        return content;

    }
    catch(ex){
        
        console.log(ex)
        callback(false);
        
    }

}

