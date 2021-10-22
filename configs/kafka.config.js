var kafkaConfig = {
    host : process.env.KAFKA_HOST || 'localhost',
    ports : process.env.KAFKA_PORTS  || '9092',
    enableSnappyCompression : process.env.ENABLE_SNAPPY_COMPRESSION || false,
    groupId: process.env.KAFKA_GROUP_ID || "group1",
    sessionTimeout: process.env.KAFKA_CONSUMER_SESSION_TIMEOUT || 180000,
    defaultTopics: process.env.DEFAULT_TOPIC || 'AggClientTopic',
    defaultErrorTopic: process.env.DEFAULT_ERROR_TOPIC || 'AggErrorClientTopic'
}

module.exports = kafkaConfig;