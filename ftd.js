var bodyParser = require('body-parser')
var port = 11002;
var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();

if (process.argv.length == 3) {
    port = process.argv[2];
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const db = new sqlite3.Database('./db/userinfo.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the userinfo database.');
});

app.use(express.static('static-content')); // this directory has files to be returned

app.post('/login/', function (req, res) {
    var name = req.body.uname;
    var pwd = req.body.pwd;
    var result = {}
    var selectSQL = "select * from user where uname = '" + name + "' and pwd = '" + pwd + "'";
    db.get(selectSQL, [], (err, row) => {
        if (err) {
            result = { status: 'error' };
        } else {
            if (row) {
                result = { status: 'pass', high_score:row.score.toString() };
            } else {
                result = { status: 'error' };
            }
        }
        res.json(result);
    });
})

app.post('/register/', function (req, res) {
    var name = req.body.uname;
    var pwd = req.body.pwd;
    var email = req.body.email;
    var result = {};
    var selectSQL = "insert into user VALUES  ('" + name + "','" + pwd + "','" + email + "', 0)";
    db.run(selectSQL, [], function (err) {
        if (err) {
            result = { status: 'error' };
        } else {
            result = { status: 'pass' };
        }
        res.json(result);
    });
})

app.put('/user/', function (req, res) {
    var name = req.body.uname;
    var email = req.body.email;
    var result = {};
    var selectSQL = "UPDATE user SET email='" + email + "' WHERE uname='" + name + "'";
    db.run(selectSQL, [], function (err) {
        if (err) {
            result = { status: 'error' };
        } else {
            result = { status: 'pass' };
        }
        res.json(result);
    });
})

app.put('/score/', function (req, res) {
    var name = req.body.uname;
    var high_score = req.body.high_score;
    var result = {};
    var updateSQL = "UPDATE user SET score='" + high_score + "' WHERE uname='" + name + "'";
    var selectSQL = "select * from user where uname = '" + name + "'";
    db.get(selectSQL, [], (err, row) => {
        if(row.score < high_score){
            db.run(updateSQL, [], function (err) {
                if (err) {
                    result = { status: 'error' };
                } else {
                    result = { status: 'pass', high_score:row.score.toString() };
                }
            });
        }
        if (err) {
            result = { status: 'error' };
        } 
        res.json(result);
    });
})

app.delete('/user/', function (req, res) {
    var name = req.body.uname;
    var result = {};
    var selectSQL = "DELETE FROM user WHERE uname='" + name + "'";
    db.run(selectSQL, [], function (err) {
        if (err) {
            result = { status: 'error' };
        } else {
            result = { status: 'pass' };
        }
        res.json(result);
    });
})

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
})