const kafkaConfig = require("../configs/kafka.config")

var kafkaClientConfigModel = {
    clientId: '',
    brokers: [],//['kafka1:9092', 'kafka2:9092']
    ssl: false,
    connectionTimeout: 0,
    requestTimeout: 0,
    sessionTimeout: 0
}

module.exports = kafkaClientConfigModel;