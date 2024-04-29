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

app.post('/auth', (req,res) =>{
    let login = 'Dima'
    console.log(req.body.login)
    console.log(req.body.password)
    console.log(req.body)
    let password = '18'
    if ((req.body.login == login || 'Anya') && req.body.password == password){
        client.query("SELECT * FROM public.demo WHERE login = $1", [req.body.login], (err,q_res)=>{
            if (!err){
                let data = q_res.rows
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
    else {
        res.render('index')
    }
})

app.post('/create', (req,res) =>{
    console.log(req.body.login);
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
})

app.post('/delete', (req, res) =>{
    console.log(req.body.note_text)
    console.log('Login')
    console.log(req.body.login1)
    console.log(typeof req.body.note_text)
    console.log(req.body)
    client.query("DELETE FROM public.demo WHERE login = $1 AND text = $2", [req.body.login1, req.body.note_text], (err, q_res)=>{
        if (!err){

        }
        else{
            console.log(err)
            res.send(err)
        }
    })
    client.query("SELECT * FROM public.demo WHERE login = $1", [req.body.login1], (err,q_res)=>{
        if (!err){
            let data = q_res.rows
            res.render('note',{
                arr: data
            });
        }
        else{
            console.log(err)
            res.send('1')
        }
    })
})
