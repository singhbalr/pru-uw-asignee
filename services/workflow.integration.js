exports.edsComplete = (req) => {
    return new Promise((res, rej) => {
        res(true);
        var request = require('request');
        try {
            console.log("edsComplete Req: ", req);

            request.post({ 
                url: (process.env.EDS_COMPLETE_URL) ? process.env.EDS_COMPLETE_URL : "http://localhost:12009/process/consumer/completeTask", 
                json: req
            }, function optionalCallback(completeTaskError, completeTaskResponse, completeTaskBody) {
                if(completeTaskError) {
                    console.log(completeTaskError);
                } else {
                    noRetry = true; // error breaking loop here
                }
            });
            console.log("Task Completed");
        }
        catch(e) {
            rej(e);
        }

    });
}