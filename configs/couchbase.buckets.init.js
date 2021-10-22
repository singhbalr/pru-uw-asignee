let configs = {}
const cbdbConfig = require('../configs/dbm.config');
let sdk = require('couch-base');
let sdkCouch = sdk();

configs.globalVariables = () => {
    global.buckets = [
        {
            bucketName: process.env.PRUONE_DATA || 'pruone-data',
        }
        
    ]

    global.listInitBucket = []

    global.initAllBuckets = async () => {
        let dbApplication = cbdbConfig.dbApplication;
        let cluster = await sdkCouch.initCluster(dbApplication.host, dbApplication.port, dbApplication.user, dbApplication.password);
    
        for(bucks in buckets){
            listInitBucket.push({
                bucketName: buckets[bucks].bucketName,
                bucket: await sdkCouch.getBucket(buckets[bucks].bucketName, cluster)
            })
        }
    }
    global.__findBucket = async (bucketName) => {
        for(bucks in listInitBucket){
            if( bucketName == listInitBucket[bucks].bucketName){
                
                return await listInitBucket[bucks].bucket;
            }
        }
    }
}

module.exports = configs;
