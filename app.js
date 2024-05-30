const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=> {
  if(req.method === "GET") {
    if(req.url === "/"){
      fs.readFile(path.join(__dirname, "index.html"), (data)=>{
        res.writeHead(200, {"content-Type": "text/html; charset = utf-8"});
        res.end(data);
      });
    }
  }


});
const p =3000;
server.listen(p,()=>{
  console.log(`http://localhost:${p}`);
});

