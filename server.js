const express = require('express');
var app = express();

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const dbfolder = __dirname + '/db';
const contatosDbPath = dbfolder + '/contatos.json';

if(!fs.existsSync(dbfolder)){
    fs.mkdirSync(dbfolder);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(process.env.PORT || 3000, function(){
    console.log('escutando na porta 3000');
});

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

app.post('api/contato', function(req, res){
    tryRead(contatosDbPath, function(contatos){
        contatos.push(req.body);

        fs.writeFile(contatosDbPath, JSON.stringify(contatos), function(err){
            if(err){
                res.status(500).json({ error: "Opa, detectamos um probleminha! Tente novamente mais tarde!" });
                return;
            }

            res.status(200).json({ success: true });
        });
    });
});

app.get('/api/artigos', function(req, req){
    const artigosDbPath = dbFolder + '/artigos.json';

    tryRead(artigosDbPath, function(artigos){
        res.status(200).json(artigos);
    });
});

app.get('*', function(req, res){
    res.status(404).send({ error: 'API not found' });
});

var tryRead = function(path, callback){
    fs.readFile(path, 'utf8', function(err, contatos){
        if(err) return callback([]);

        var contatosJSON = [];
        try{
            contatosJSON = JSON.parse(contatos);
        } catch(error) { }

        return callback(contatosJSON);
    })
}