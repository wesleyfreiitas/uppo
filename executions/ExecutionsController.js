const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const Execution = require("./Execution")


router.get("/executions", userAuth, (req, res) => {
  Execution.findAll().then(executions => {
    res.render("executions/index", { executions: executions, user: req.session.user })
  })
});

router.get("/dashboard", userAuth, (req, res) => {
  Execution.findAll().then(executions => {
    id = executions.id_workflow;
    Execution.findByPk(id).then(execution => {
      if(execution != undefined){
          Integration.findAll().then(integrations => {
              res.render("dashboard", {integrations: integrations, execution: execution})
          });
      }else{
          res.redirect("/erro");
      }
    }).catch(err => {
      res.redirect("/erro");
    });
      res.render("executions/index",{ executions: executions, user:req.session.user })
    })
});

module.exports = router;
