const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

//Direcionar para criar usuario

router.get("/signup", (req, res) => {
    User.findAll().then(users => {
        res.render("users/create")
    })
})

// Signup usuários

router.post("/users/create", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    // res.json({name,email, password});
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
                name: name,
                email: email,
                phone: phone,
                password: hash
            }).then(() => {
                res.redirect("/login");
            }).catch((err) => {
                res.redirect("/signup")
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
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email:email}}).then(user => {
        //Verifica se existe um email com esse usuário
        if(user != undefined){
            //Valida a senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct){
                req.session.user = {
                    name: user.name,
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

//Faz o logout

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router

