const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

//Criar usuario
router.get("/signup", (req, res) => {
    User.findAll().then(users => {
        res.render("users/create")
    })
})

// //

// router.get("/users/create", (req, res) => {
//     res.render("/users/index", { users: users })
// })

// Signup usuários

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    // res.json({email, password});
    User.findOne(
        {
            where: { email: email }
        }
    ).then(user => {
        //Logica para evitar e-mails duplicados
        // console.log(user)
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/")
            })
        } else {
            res.redirect("/users/create")
        }
    });
});

//Chama login

router.get("/login", (req, res) => {
    res.render("users/login");
})

// Faz login

router.post("/authenticate",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email:email}}).then(user => {
        //Verifica se existe um email com esse usuário
        if(user != undefined){
            //Valida a senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/dashboard");
            }else{
                res.redirect("/login"); 
            }

        }else{
            res.redirect("/login");
        }
    });

});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router

