exports.dbConfig = {
    user: "uwassgineenode",
    password: "uwassgineenode",
    server: process.env.SOS_DB_SERVER || 'localhost',
    database: process.env.SOS_DB || 'uw_workflow_db_dev',
    "port": 1433,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}



