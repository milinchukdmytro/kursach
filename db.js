const Client = require('pg').Client

const client = new Client({
    user: "uaqsr7sn6gcqh4",
    port: 5432,
    host: "c6b7lkfdshud3i.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com",
    password: "padc5893ac23aa102f3eaccacf595fdcc5e4a4cc964524d626c5ee5c5ff34dfb0",
    database: "d4uf61kbep18i4",
    ssl: {
        rejectUnauthorized: false
    }
})



client.connect();
console.log('connected')
client.query("SELECT * FROM public.test", (err,res)=>{
    if (!err){
        console.log(res.rows)
    }
    else{
        console.log(err)
    }
    client.end()
})

