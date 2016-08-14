"use strict";

const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        database: "converge",
        user: "converge",
        password: "converge",
    },
});

module.exports = db;
module.exports.clean = () => db.schema.raw("TRUNCATE data RESTART IDENTITY CASCADE;");

module.exports.get = function(searchParameters){
    
    let query = db('data').where("sensorId", searchParameters.sensorId)

    // In the readme it says that you should use an int - but the code implied strongly 
    // and ISO string so I assumed you meant an iso string.

    if (searchParameters.hasSince){
        query = query.andWhere("time", ">", searchParameters.since.toISOString())
    }

    if (searchParameters.hasUntil){
        query = query.andWhere("time", "<", searchParameters.until.toISOString())
    }
    
    return query.select()

}