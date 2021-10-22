const hashicorp = require('../services/hashicorp.vault.service');

exports.serviceDetails = {
    hostname : process.env.DBM_HOSTNAME || 'localhost',
    port : process.env.DBM_PORT  || '8002',
    upsertPath : process.env.UPSERT_PATH || '/api/cb/upsert',
    getByIdPath : process.env.GETBYID_PATH || '/api/cb/getByKey' 
}

exports.cbBuckets = {

    pruoneDataBucket : process.env.PRUONE_DATA || 'pruone-data'

}

const dbuser = hashicorp.getSecretValue('pruone-cb', 'pruone-cb-username') || process.env.COM_COUCHBASE_USER || 'Administrator'; 
const dbpass = hashicorp.getSecretValue('pruone-cb', 'pruone-cb-password') || process.env.COM_COUCHBASE_PWORD || 'password';
const dbhost = process.env.COM_COUCHBASE_DBHOST || 'localhost';
const dbport = process.env.COM_COUCHBASE_DBPORT || '8091';

exports.dbApplication = {
    user: dbuser,
    password: dbpass,
    host: dbhost,
    port: dbport
}