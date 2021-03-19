// Thanks to Adrian De Niz for this static HTML server template

// Modules
const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const url = require('url');
const quiz = require('./modules/quiz_project');

console.log(quiz.test());

// Global Variables
var DBconnected = false;
var DBHost = "us-cdbr-east-03.cleardb.com";
var DBuser = "b25715a5e769ae";
var DBpwd = "61476d2a"
var DBdb = "heroku_3b482e602de5856"
var hostname = process.env.HOST || '127.0.0.1'; // use hostname 127.0.0.1 unless there exists a preconfigured port
var port = process.env.PORT || 8080; // use port 8080 unless there exists a preconfigured port

http.createServer(function (req, res) {
  let q = url.parse(path.normalize(req.url), true);
  //console.log('Request: ', q);
  let filePath = "";

  if (q.pathname.includes("/getquestions")) {
    if (DBconnected) {
      con.query('SELECT * FROM quizzes;', function (err, result) {
        if (err) {
          console.log(err);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          res.end("Error reading from DB");
        } else {
          questions = [];
          // console.log(result);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          for (i = 0; i < result.length; i++) {
            temp = {
              quiz_id: result[i].quiz_id,
              display_name: result[i].display_name,
              quiz_data: result[i].quiz_data
            }
            questions.push(temp);
          }
          res.write(JSON.stringify(questions));
          res.end();
        }
      });
      return;
    }
  }

  else if (q.pathname.includes("/savequestions")) {
    if (req.method === 'POST') {
      body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        console.log(body);

        if (DBconnected) {
          con.query('UPDATE `quizzes` SET `quiz_data` = "' + body + '" WHERE `quiz_id` = 1;', function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log("Success!");
            }
          });
          return;
        }

      });
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    }
  }

  // Paths with no specific file e.g. https://localhost/ as opposed to https://localhost/index.html
  else if (q.pathname.indexOf(".") < 0) {
    filePath = path.join("public" + q.pathname + "/index.html");
  }
  else {
    filePath = 'public' + req.url;
  }

  let extname = String(path.extname(filePath)).toLowerCase();
  let mimeTypes = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'
  };

  let contentType = mimeTypes[extname] || 'application/octet-stream';

  // console.log("File path: " + filePath);
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('public/404.html', function (error, content) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });

}).listen(port);
console.log(`Server running at http://${hostname}:${port}/`);

const con = mysql.createConnection({
  host: DBHost,
  database: DBdb,
  user: DBuser,
  password: DBpwd
});

con.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected to MySQL!");
    DBconnected = true;
  }
});

// Keep connection alive, otherwise closes after ~30s of inactivity
setInterval(function () {
  con.query('SELECT 1 FROM score', function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('DB Connection active (' + DBHost + ":" + DBdb + ')');
  });
  //}, 5000); // For testing
}, 45000); // Turns out 45s is slow enough to not feel like I'm wasting DB resources, but frequent enough to still work.