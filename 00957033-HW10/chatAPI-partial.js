//chatAPI-partial.js
const http = require('http');
const url = require('url');
const fs = require('fs');

let txt = [];

http.createServer(function (req, res) {
    let path = url.parse(req.url, true).pathname;
    console.log("Request:" + path);
    if (path == "/") {
        fs.readFile('chat.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else if (path == "/chat") {
        let Now = new Date(); 
        let q = url.parse(req.url, true).query;
        if (q.user && q.say) {
            txt.push({ "user": q.user, "say": q.say, "time": Now.toLocaleDateString() + " " + Now.toLocaleTimeString() }); //取得本地的日期跟時間
            res.setHeader('Content-Type', 'application/json');
            console.log(txt);
            res.end(JSON.stringify(txt)); //要把物件陣列轉為json再丟給前端
        }
        
        
    } else if (path == "/save") {
        // TODO
    } else if (path == "/reload") {
        // TODO
    }
    else {
        res.end();
    }
}).listen(8080);