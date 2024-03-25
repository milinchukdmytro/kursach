let express = require("express");
let app = express();
var http = require('http');
var port = 8080;
var server = http.createServer(app);
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
app.listen()
app.set('port', port);
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
server.listen(port);
app.use(express.static(__dirname + '/views'));
client.connect()

app.get('/', function (req, res) {
    res.render('index');
});

// curl -d "login="Dima"&password="18"" -X POST 127.0.0.1:8080/auth
app.post('/auth', (req,res) =>{
    //console.log(req.body)
    let login = 'Dima'
    let password = '18'
    if ((req.body.login == login || 'Anya') && req.body.password == password){
        get_data(req, res)
    }
    else {
        res.render('index')
    }
})

//curl -d "login="Dima"&password="18"&text="hello"" -X POST 127.0.0.1:8080/create
app.post('/create', (req,res) =>{
    console.log(req.body.login);
    console.log(req.body.password);
    console.log(req.body.note);
    client.query('INSERT INTO public.demo (login, text) VALUES ($1, $2)',[req.body.login, req.body.note], (err, q_res) =>{
        if (err){
            console.log(err)
        }
    })
    client.query("SELECT * FROM public.demo WHERE login = $1", [req.body.login], (err,q_res)=>{
        if (!err){
            let data = q_res.rows
            console.log(data)
            for (let i=0; i<data.length; i++){
                console.log(data[i].text)
            }
            res.render('note',{
                arr: data
            });
        }
        else{
            console.log(err)
            res.send('1')
        }
    })
    //console.log(req.body)
})

app.delete('/delete')

// app.get('/note', (req,res) =>{
//     client.query("SELECT * FROM public.demo WHERE login = $1", [req.body.login], (err,q_res)=>{
//         if (!err){
//             let data = q_res.rows
//             //console.log(data)
//             for (let i=0; i<data.length; i++){
//                 //console.log(data[i].text)
//             }
//             res.render('note',{
//                 arr: data
//             });
//         }
//         else{
//             console.log(err)
//             res.send('1')
//         }
//     })
// })


function get_data(req,res) {
    client.query("SELECT * FROM public.demo WHERE login = $1", [req.body.login], (err,q_res)=>{
        if (!err){
            let data = q_res.rows
            //console.log(data)
            for (let i=0; i<data.length; i++){
                //console.log(data[i].text)
            }
            res.render('note',{
                arr: data
            });
        }
        else{
            console.log(err)
            res.send('1')
        }
    })
}