var { Kafka, CompressionCodecs  } = require('kafkajs');
const kafkaConfig = require('../configs/kafka.config');
const kafkaUtil = require('../utils/kafka.util');
const dbmConfig = require('../configs/dbm.config');
let sdk = require('couch-base');
let sdkCouch = sdk();
let bucket;
const kafka = new Kafka(kafkaUtil.getDefKafkaClientConfig());
const producer = kafka.producer();
const processor = require('../processors/datalake.ingest.proc');
// const akv = require('../services/azure.keyvault.service');
// const akvConfig = require('../configs/azure.keyvault.config');

// const cbGlobal = require('../configs/couchbase.buckets.init');
// cbGlobal.globalVariables();

// akv.getSecretValue(akvConfig.encryptionSecretKey); 
// akv.getSecretValue(akvConfig.ivBase64SecretKey);

exports.consumeKafkaTopic = async (kafkaConfigModel, compressionCodecs, kafkaConsumerConfig, topics) => {
    
    if(compressionCodecs) CompressionCodecs = compressionCodecs; 
    const kafka = new Kafka(kafkaConfigModel);
    const consumer = kafka.consumer(kafkaConsumerConfig);
    await consumer.connect();
    await subscribeToTopics(consumer, topics);
    await runConsumer(consumer);
    await producer.connect();

    // initAllBuckets();
    
}

async function runConsumer(consumer){

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            message = {
                key: message.key,
                value: message.value.toString(),
                headers: message.headers,
            }
            let req = JSON.stringify(message.value);
            if(!req.fromTopic) {
                processor.doProcess(message);
            }
           
        }
    });

}

async function subscribeToTopics(consumer, topics){

    if(!topics) topics = kafkaConfig.defaultTopics.split(',');
    console.log('topics :');
    for(topic of topics) {
        console.log('- ', topic); 
        await consumer.subscribe({ topic: topic, fromBeginning: false });
    }
    console.log('');

}
