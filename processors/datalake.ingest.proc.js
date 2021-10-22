var { Kafka, CompressionCodecs  } = require('kafkajs');
var dbService = require('../services/db.service');
const kafkaUtil = require('../utils/kafka.util');
const dbmConfig = require('../configs/dbm.config');
let sdk = require('couch-base');
let sdkCouch = sdk();
const kafka = new Kafka(kafkaUtil.getDefKafkaClientConfig());
const producer = kafka.producer();
const encryptionService = require('../services/data.encryption.service')
const httpUtil = require('../utils/http.util');
let { url, headers } = require('../configs/cs.pub.config');
const kafkaConfigModel = kafkaUtil.getDefKafkaClientConfig();
const workflowInteg = require("../services/workflow.integration")
const dbProcess = require("../connection/db")
// exports.doProcess = (message) => new Promise(async (resolve, reject) => {

//     try {
//         var jsonMessage = JSON.parse(message.value);
//         console.log(jsonMessage);
      
//         workflowInteg.edsComplete(jsonMessage);
        
//         resolve(true);
        
//     }
//     catch(e) {

//         console.log('error :', e);
//         console.log('Error 5000 - Failed processing message : ', message.value);
//         resolve(false);
        
//     }

// });

exports.doProcess = (message) => new Promise(async (resolve, reject) => {

    try {
        console.log(message)
        var jsonMessage = JSON.parse(message.data.transactionState);



        let result = {
            "decision": "true"
            
        }

        let resultSp = await dbProcess.runSp("transactionState", "message.data.transactionState", "spGetAsignee")



        // let query = `SELECT TOP 1 empID, count(*) as transactionCount FROM transaction_table WHERE role_id = ${message.data.transactionState} GROUP BY empID order by transactionCount ASC`;
        // let response = await dbProcess.db(query)
        // reply.code(200).send(JSON.stringify(response[0]));
        // console.log("response from database server");
        // console.log(response);

        // await init();
        if(jsonMessage.completeTask) {
            // produce to complete Task Topic
            var produceMessage = {
                "taskId": jsonMessage.completeTask.taskId,
                "payloadId": resultSp,
                "action": "eds", 
                "variableName": jsonMessage.completeTask.variableName,
                "data": result
            }
            producer.produceMessage(kafkaConfigModel, jsonMessage.completeTask.topic, produceMessage)
        }


        resolve(true);
        
    }
    catch(e) {

        console.log('error :', e);
        console.log('Error 5000 - Failed processing message : ', message.value);
        resolve(false);
        
    }

});
async function init(){

    try{

        let cbDetails = getBucketDetails('pruoneDataBucket');
        let dbApplication = dbmConfig.dbApplication;
        let cluster = await sdkCouch.initCluster(dbApplication.host, dbApplication.port, dbApplication.user, dbApplication.password);
        bucket = await sdkCouch.getBucket(cbDetails.bucketName, cluster);

    }
    catch(e) {

        console.log("Error 5000 - Failed instantiating database components.");

    }
    return;
    

}

