import http2 from 'http2';
import fs from 'fs'


const server = http2.createServer((req,res)=>{
    console.log(req.url);

    // res.writeHead(200,{'Content-Type':'text/html'})
    // res.write('<h1>Hola mundo</h1>')
    // res.end()

    // const data = {name:"john doe", age:30, city:'ny'}
    // res.writeHead(200,{"Context-Type":"application/json"});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){
        
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(htmlFile)
        return;
    }
    if(req.url?.endsWith('.js')){
        res.writeHead(200,{"Content-Type":"aplication/javascript"})
    }else if (req.url?.endsWith('.css')){
        res.writeHead(200,{"Content-Type":"text/css"});
    }
    const responseContent = fs.readFileSync(`./public${req.url}`,'utf-8')
    res.end(responseContent)
})

server.listen(3000,()=>{
    console.log("server runing 3000")
})