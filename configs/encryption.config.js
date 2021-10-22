
var encryptionDetails = {
    base64Key :  process.env.ENCRYPTION_KEY,
    base64IV : process.env.ENCRYPTION_IV
}

module.exports = encryptionDetails;
