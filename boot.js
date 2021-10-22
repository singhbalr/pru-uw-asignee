// const consumer = require('./consumers/data.stream.consumer');
// const kafkaUtil = require('./utils/kafka.util');

// const { doProcess } = require("../uw-get-queue/processors/datalake.ingest.proc");

//Supports SNAPPY compression only and can be enabled when env var ENABLE_SNAPPY_COMPRESSION = true; see './configs/kafka.config';
//Will default to no compression when env var ENABLE_SNAPPY_COMPRESSION is undefined or false
//Accepts array of topics as 4th parameter ['topic1, topic2']
//When topic parameter is not supplied, env var DEFAULT_TOPIC will be used; see  './configs/kafka.config';
// consumer.consumeKafkaTopic(kafkaUtil.getDefKafkaClientConfig(),
//                            kafkaUtil.getKafkaCompressionCodec(),
//                            kafkaUtil.getDefKafkaConsumerConfig())
// var { Kafka, CompressionCodecs  } = require('kafkajs');
// const kafkaUtil = require('./utils/kafka.util');
// const kafka = new Kafka(kafkaUtil.getDefKafkaClientConfig());
// const producer = kafka.producer();
const dbProcess = require("./connection/db")

async function doProcess(message){

    try {

        const {data} = message
        var jsonMessage = JSON.parse(data.transactionState);


        let result = {
            "decision": "true"
            
        }

        let resultSp = await dbProcess.runSp("transactionState",message.data.transactionStat, "spGetAsignee")



        // let query = `SELECT TOP 1 empID, count(*) as transactionCount FROM transaction_table WHERE role_id = ${message.data.transactionState} GROUP BY empID order by transactionCount ASC`;
        // let response = await dbProcess.db(query)
        // console.log(response);
        // // reply.code(200).send(JSON.stringify(response[0]));
        // console.log("response from database server");
        // console.log(response);

        // await init();
        // if(jsonMessage.completeTask) {
            // produce to complete Task Topic
            var produceMessage = {
                "taskId": jsonMessage.completeTask.taskId,
                "payloadId": resultSp,
                "action": "eds", 
                "variableName": jsonMessage.completeTask.variableName,
                "data": result
            }
            console.log(JSON.parse(produceMessage));
            // producer.produceMessage(kafkaConfigModel, jsonMessage.completeTask.topic, produceMessage)
        // }



        
    }
    catch(e) {

        console.log('error :', e);
        console.log('Error 5000 - Failed processing message : ', message.value);

        
    }

}
const payload = {
    data: {
        transactionState: 1
    },
    policyNo: "",
    completeTask:{
        taskId: "",
        topic:"",
        variableName:""
    }
}

doProcess(payload)