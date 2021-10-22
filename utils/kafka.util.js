const SnappyCodec = require('kafkajs-snappy');
var { CompressionTypes, CompressionCodecs  } = require('kafkajs');
const kafkaClientConfigModel = require('../models/kafka.client.config.model');
const kafkaConsumerConfigModel = require('../models/kafka.consumer.config.model');
var kafkaConfig = require('../configs/kafka.config');
const stringUtil = require('./string.util');

exports.getKafkaCompressionCodec = (compressionCodec) => {
    
    if(compressionCodec = kafkaConfig.enableSnappyCompression ? 'SNAPPY' : null){
        CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;
        return CompressionCodecs;
    }
    return null;

}

exports.getDefKafkaClientConfig = () => {
    
    var defKafkaConfigModel = kafkaClientConfigModel;
    var singleBroker = [kafkaConfig.host + ':' + kafkaConfig.port];
    defKafkaConfigModel.clientId = stringUtil.getUnSafeRandomString();
    defKafkaConfigModel.brokers = createDefKafkaBrokers();
    defKafkaConfigModel.connectionTimeout =30000,
    defKafkaConfigModel.requestTimeout = 180000,
    defKafkaConfigModel.sessionTimeout =  180000
    return defKafkaConfigModel;
    
}

exports.getDefKafkaConsumerConfig = () => {
    
    var defKafkaConsumerConfig = kafkaConsumerConfigModel;
    defKafkaConsumerConfig.groupId = kafkaConfig.groupId;
    defKafkaConsumerConfig.sessionTimeout = kafkaConfig.sessionTimeout;
    return defKafkaConsumerConfig;

}

function createDefKafkaBrokers() {

    var brokers = [];
    console.log('');
    console.log('brokers : ');
    for(port of kafkaConfig.ports.split(',')){
        brokers.push(kafkaConfig.host + ':' + port);
        console.log('- ', kafkaConfig.host + ':' + port);
    }
    console.log('');
    return brokers;

}

