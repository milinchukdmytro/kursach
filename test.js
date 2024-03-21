let express = require("express");
let app = express();
var http = require('http');
var port = 8080;
var server = http.createServer(app);



app.listen()
app.set('port', port);
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
server.listen(port);
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.render('index');
});

// curl -d "login="Dima"&password="18"" -X POST 127.0.0.1:8080/auth
app.post('/auth', (req,res) =>{
    console.log(req.body)
    let login = 'Dima'
    let password = '18'
    if (req.body.login == login && req.body.password == password){
        //res.send('hello')
        res.render('note')
    }
    else {
        res.render('index')
    }
})

app.post('/create', (req,res) =>{
    console.log(req.body.login);
    console.log(req.body.password);
    console.log(req.body.note);
    res.send('Done')
})