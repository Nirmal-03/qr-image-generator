import express  from 'express';
import qrimg from "qr-image";
import bodyParser from 'body-parser';
import Fs from "fs";
import { dirname } from 'path';
import path from "path";
import { fileURLToPath } from 'url';

const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("page",{
        src:"/image/qr.png"
    });
});

app.post("/submit",(req,res)=>{
    const url=req.body.link;
    const qrimage=qrimg.image(url);
    const pathOfFile=path.join(__dirname+"/public/image/qr-image.png");
    qrimage.pipe(Fs.createWriteStream(pathOfFile));
    res.render("page",{
        src:"/image/qr-image.png"
    })

})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}.`)
})