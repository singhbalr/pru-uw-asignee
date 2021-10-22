const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const akvConfig = require('../configs/azure.keyvault.config.js');
const vault = require('./hashicorp.vault.service');

process. env['AZURE_CLIENT_ID'] = vault.getSecretValue(akvConfig.path, akvConfig.clientIdKey);
process. env['AZURE_CLIENT_SECRET'] = vault.getSecretValue(akvConfig.path, akvConfig.clientSecretKey);
process. env['AZURE_TENANT_ID'] = vault.getSecretValue(akvConfig.path, akvConfig.tenantIdKey); 

console.log(process.env.AZURE_CLIENT_ID);
console.log(process.env.AZURE_TENANT_ID);

const credential = new DefaultAzureCredential();

const vaultName = akvConfig.keyVaultName;
const url = `https://${vaultName}.vault.azure.net`;

const client = new SecretClient(url, credential);

async function getSecretValue(secretName)  {
    try {
         var secret = await client.getSecret(secretName).then(secret => {return secret.value} );

        if (secret){
            console.log('secret:', secret);
            //set connection string to env var as promise does not resolve
            if (secretName == akvConfig.encryptionSecretKey){   
                process. env['ENCRYPTION_KEY'] = secret;
            }
            if (secretName == akvConfig.ivBase64SecretKey){
                process. env['ENCRYPTION_IV'] = secret;
            }
            return secret;
        }
        else{
            return false;
        }
    }
    catch (e){
        console.log('error', e);
    }
}

exports.getSecretValue = getSecretValue;