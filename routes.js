const fs=require('fs');

const users=require('./Users/users')


const routeHandler=(req,res)=>{

    if(req.url ==='/'){
        
        res.setHeader('content-type','text/html');
        res.write(`
            <html>
            <head><title>Node js Assesment</title></head>
            <body>
                <h1>This is node js understanding basic assesment</h1>
                <form action='/create-user' method='POST'>
                    Enter User name:
                    <input type="text" name="username"><br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `)
        return res.end();
    }
    if(req.url ==='/user'){
        let data=users.get();
        res.setHeader('content-type','text/html');
        res.write('<ul>')
        for(let i=0;i<data.length;i++){
            res.write(`<li>User ${i+1}: ${data[i]} </li>`);
        }
        res.write('</ul>');
        res.write(`<a href='/'>Add user</a>`);
        return res.end();
    }
    if(req.url==='/create-user'){
       let body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            let userName=parsedBody.split('=')[1];
            users.create(userName);
            res.statusCode=302;
            res.setHeader('Location','/user')
            res.end();
        })

    }
}
module.exports=routeHandler;