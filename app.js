const express = require('express')
const app = express()
const ejs=require("ejs")
const bodyParser=require("body-parser")
const mysql=require("mysql")

app.set("view engine",'ejs')
app.use(bodyParser.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    port:3306,
    database:"test",
  });
app.get("/",(req,res)=>{
    connection.query("SELECT * FROM testtable",function(err,result){
        if(err) throw err;
        res.render("home",{posts:result})

    })
})
app.post("/home",(req,res)=>{
    console.log(req.body)
    connection.query("INSERT INTO testtable SET content=?",[req.body.message],function(err,rows){
        if(err) throw err;
        res.redirect("/")

    })

})
app.post("/reception",(req,res)=>{
    res.status(201).render("home")
    
    console.log(req.body)
})
const PORT=8080||process.env.PORT;
app.listen(PORT,()=>{console.log("server started running on port:"+PORT)});