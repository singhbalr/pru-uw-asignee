var config = {}

config.keyVaultName = process.env.COM_AZURE_KEYVAULTNAME || 'kvaphlifedevaz1tl3i9a01';
config.path =  process.env.COM_HASHICORP_PATH || 'datalake-secrets';
config.clientIdKey = process.env.COM_HASHICORP_CLIENTID_PATH || 'pluk_dl_spn_clientid'
config.clientSecretKey = process.env.COM_HASHICORP_CLIENT_SECRET_PATH || 'pluk_dl_spn_clientsecret'
config.tenantIdKey = process.env.COM_HASHICORP_TENANTID_PATH || 'pluk_dl_tenant_id'
config.encryptionSecretKey = process.env.ENCRYPTION_SECRETKEY || 'pluk-dl-pruone-encryptkey'
config.ivBase64SecretKey = process.env.IVBASE64_SECRETKEY || 'pluk-dl-pruone-ivbase64'

module.exports = config;