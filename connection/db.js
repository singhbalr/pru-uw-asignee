const sql = require('mssql');
const configs = require("../configs/connection")


sql.on('error', err=> {
    console.log(err.message);
});



exports.db = async(query) => {
    console.log("db init")
    try{
        console.log("pool init")
        // let pool = await sql.connect(config)
        let pool = await new sql.ConnectionPool(configs.config).connect();
        // let refNo = requestBody.referenceNo;
        // let result = await  pool.request()
        //             .input('transactionId', sql.VarChar(50), requestBody.transactionId)
        // .execute('dbo.sp_insertSOS');


        console.log("Database Connected");
        let res = await pool.request().query(query)
        console.log("Query Done")

        sql.close();
        return res.recordset;
    }catch(error){
        return error
    }
}

exports.runSp = async(key, value, sp)=>{
    console.log("configs.configs", configs.dbConfig);
    console.log("Sp function executed");
    let pool = await new sql.ConnectionPool(configs.dbConfig).connect();
    console.log("Database Connected");
    try{
        
        let result = await pool.request()
            .input(key, sql.Int, value)
            .execute(sp)
            console.log("Query Done")
            pool.close();
            return result
    }catch(error){
        pool.close();
        return error
    }
}
