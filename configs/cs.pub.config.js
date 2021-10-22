var serviceDetails = {
    url : process.env.CS_PUB_URL || 'http://localhost:3001',
    headers :  process.env.DEFAULT_HEADERS || { 'Content-Type': 'text/plain'  }
}


module.exports = serviceDetails;

