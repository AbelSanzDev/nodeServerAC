"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync("./key/server.key"),
    cert: fs_1.default.readFileSync("./key/server.crt")
}, (req, res) => {
    console.log(req.url);
    // res.writeHead(200,{'Content-Type':'text/html'})
    // res.write('<h1>Hola mundo</h1>')
    // res.end()
    // const data = {name:"john doe", age:30, city:'ny'}
    // res.writeHead(200,{"Context-Type":"application/json"});
    // res.end(JSON.stringify(data));
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(htmlFile);
        return;
    }
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { "Content-Type": "aplication/javascript" });
    }
    else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { "Content-Type": "text/css" });
    }
    try {
        const responseContent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    }
    catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();
    }
});
server.listen(3000, () => {
    console.log("server runing 3000");
});
