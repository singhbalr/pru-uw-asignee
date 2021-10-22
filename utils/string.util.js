
exports.getUnSafeRandomString = () => {

    return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    
}


exports.getStringURL = (protocol, baseUrl, port, path) => {

    return  protocol + "://" + baseUrl + ":" + port + path
    
}

