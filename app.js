//Require


//Constants
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const OS = require("./routes/OS");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session")
const db = require('./config/db')


const mongodbConnection = db.mongoURI

//Config

  //Session
    app.use(session({
      secret:"ostestes",
      resave:true,
      saveUninitialized:true
    }));


    app.use(flash());

  //Middlewares
    app.use((req,res,next)=>{
      //variaveis globais
      
      res.locals.success_msg = req.flash("success_msg");
      res.locals.err_msg = req.flash("err_msg");

      next();
    });

  //Body Parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    
  //Handlebars

    app.engine('handlebars',handlebars.engine({defaultLayout:'main',
      runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true
      },
    }));
    app.set('view engine','handlebars');

  //Mongoose
    mongoose.set('strictQuery',true);
    mongoose.Promise = global.Promise;
    mongoose.connect(mongodbConnection)
      .then(()=>{
        console.log("> [database] Mongodb connection successful")
      })
      .catch((err)=>{
        console.log("> [database] Mongodb connection error: "+err)
      });
      
  //Public
    app.use(express.static(path.join(__dirname,"public"))); //direcionar arquivos estáticos

  //Routes

    app.use("/os",OS)  

    app.get('/',(req,res)=>{
      res.render('index');
    })


const PORT = process.env.PORT || 8082;
let date = Date();

app.listen(PORT,()=>{
  console.log(`> [app] Server Running on port ${PORT}! - ${date}`);
});

