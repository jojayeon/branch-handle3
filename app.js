const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=> {
  if(req.method === "GET") {
    if(req.url === "/"){
      fs.readFile(path.join(__dirname, "index.html"), (err,data)=>{
        if(err){
          console.log(err);
        }
        res.writeHead(200, {"content-Type": "text/html; charset = utf-8"});
        res.end(data);
      });
    }
  }else if (req.method === "POST") {
    if(req.url === "/submit"){
      let body = "";
      req.on("data", (chunk) =>{
        body += chunk.toString();
      });
      req.on("end", ()=>{
        const parsedData = new URLSearchParams(body);
        const title = parsedData.get("title");

        const jsonData = {
          title : title
        };

        const jsonDataString = JSON.stringify(jsonData, null, a);
        fs.writeFile(path.join(__dirname, "datajson"), jsonDataString, (err)=>{
          if(err){
            console.log(err);
          }
          res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
          res.end();
        });
      });
    }
  }


});

const p =3000;
server.listen(p,()=>{
  console.log(`http://localhost:${p}`);
});

