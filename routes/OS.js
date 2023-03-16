require("../models/OSM");

const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const OSM = mongoose.model("osm");


router.get("/",(req,res)=>{
  OSM.find().sort({osNumber:'desc'})
    .then((os)=>{
      res.render("OS/index",{os:os})
    }).catch((err)=>{
      req.flash("err_msg","Houve um erro ao listar as Ordens de Serviço");
      res.redirect("OS/new");
    });
});

router.get("/new",(req,res)=>{
  res.render("OS/newOS");

});


router.get('/verOS/:osNumber',(req,res)=>{
  OSM.findOne({osNumber: req.params.osNumber})
    .then((os)=>{
      res.render("OS/seeOS",{os:  os})

    }).catch((err)=>{
      req.flash("err_msg","Esta ordem de serviço não existe");
      res.redirect("/os")
    })
});

router.get('/editar/:osNumber',(req,res)=>{
  OSM.findOne({osNumber: req.params.osNumber})
    .then((os)=>{
      res.render("OS/editOS",{os:  os})

    }).catch((err)=>{
      req.flash("err_msg","Erro ao carregar a pagina de edição");
      res.redirect("/os")
    })
});

router.get('/print/:osNumber',(req,res)=>{
  OSM.findOne({osNumber: req.params.osNumber})
      .then((os)=>{
        res.render("OS/printOS",{os:  os})
  
      }).catch((err)=>{
        req.flash("err_msg","Esta ordem de serviço não existe");
        res.redirect("/os")
      })
})

router.post("/edit",(req,res)=>{

  OSM.findOne({_osNumber: req.body.osNumber})
        .then((os)=>{
          os.osNumber = req.body.osNumber;
          os.name = req.body.name;
          os.phone = req.body.phone;
          os.model = req.body.model;
          os.issue = req.body.issue;
          os.enterDate = req.body.enterDate;
          os.exitDate = req.body.exitDate;
          os.value = req.body.fixValue;

          os.save()
            .then(()=>{
              req.flash("success_msg","Ordem de serviço editada com sucesso")
              res.redirect("/os")
            })
            .catch((err)=>{
              req.flash("err_msg","Houve um erro Interno ao editar a OS")
              res.redirect("/os")
            })

        })
        .catch((err)=>{
          req.flash("err_msg","Houve um erro ao editar a OS") 
          console.log("> [os] "+err)
          res.redirect("/os")
 
        })

})

router.post('/deletar',(req,res)=>{
  OSM.remove({_id: req.body.id})
    .then(()=>{
      req.flash("success_msg","Ordem de serviço deletada com sucesso!")
      res.redirect('/os')
    })
    .catch(()=>{
      req.flash("err_msg","Erro ao deletar a OS")
      res.redirect('/')
    });
});

router.post("/new",(req,res)=>{
  let error = [];

  // if(!req.body.osNumber || typeof(req.body.osNumber) == undefined || req.body.osNumber == null){
  //   error.push({text:"Ordem de serviço inválida!"});
  // }
  // if(!req.body.name || typeof(req.body.name) == undefined || req.body.name == null){
  //   error.push({text:"Nome do cliente Inválido!"});
  // }
  // if(!req.body.phone || typeof(req.body.phone) == undefined || req.body.phone == null){
  //   error.push({text:"Telefone do cliente Inválido!"});
  // }
  // if(!req.body.model || typeof(req.body.model) == undefined || req.body.model == null){
  //   error.push({text:"Modelo Inválido!"});
  // }
  // if(!req.body.issue || typeof(req.body.issue) == undefined || req.body.issue == null){
  //   error.push({text:"Defeito Inválido!"});
  // }
  // if(!req.body.enterDate || typeof(req.body.enterDate) == undefined || req.body.enterDate == null){
  //   error.push({text:"Data de entrada inválida!"});
  // }
  // if(!req.body.fixValue || typeof(req.body.fixValue) == undefined || req.body.fixValue == null){
  //   error.push({text:"Valor do conserto inválido!"});
  // }

  //size validation

  // if(req.body.name.length < 3){
  //   error.push({text:"Nome do cliente muito pequeno!"});
  // }
  // if(req.body.phone.length < 11){
  //   error.push({text:"Telefone do cliente muito pequeno!"});
  // }
  // if(req.body.issue.length < 2){
  //   error.push({text:"Defeito do cliente muito pequeno!"});
  // }

  if(error.length > 0){
    res.render("os/newOS",{error:error});
  }else{
    if(OSM.findOne({osNumber: req.body.osNumber})
    .then((os)=>{
      if(os){
        req.flash("err_msg","Essa Ordem de serviço ja existe!");
        res.redirect('/os');
      }else{
        

        const newOS = ({
          osNumber:req.body.osNumber,
          name:req.body.name,
          phone:req.body.phone,
          model:req.body.model,
          issue:req.body.issue,
          enterDate:req.body.enterDate,
          exitDate:req.body.exitDate,
          value:req.body.fixValue

        });


        new OSM(newOS).save().then(()=>{
          req.flash("success_msg","Nova ordem de serviço salva com sucesso!");
          res.redirect("/os");
        }).catch((err)=>{
          req.flash("err_msg","Ocorreu um erro ao salvar a nova OS! Tente novamente!");
          console.log("> [os] "+err)
          res.redirect("/os");
        })

      }
    }).catch((err)=>{
      req.flash("err_msg","Erro interno!");
      console.log("> [os] "+err)
      res.redirect("/os")
    }));

  }


 

  // if(OSM.findOne({osNumber: req.body.osNumber})
  //   .then((os)=>{
  //     if(os){
  //       error.push({text:"Essa Ordem de serviço ja existe!"});
  //       req.redirect('/')
  //     }

  //   })
  //   .catch((err)=>{
  //     req.flash("error")
  //   }));

  
});





module.exports = router;