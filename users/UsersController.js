const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

const nodemailer = require("nodemailer");

//Direcionar para criar usuario

router.get("/signup", (req, res) => {
    User.findAll().then(users => {
        res.render("users/create")
    })
})
router.get("/remember", (req, res) => {

    res.render("users/remember")

})

router.post("/reset", (req, res) => {
    const { password, token } = req.body;
    console.log(token + "  " + password)
    User.findOne(
        {
            where: { tokenRefresh: token }
        }
    ).then(user => {

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        User.update({ tokenRefresh: "", password: hash },
            { where: { tokenRefresh: token } })
            .then(() => {
                res.redirect("/login");
            }).catch((err) => {
                console.log(err)
                res.redirect("/signup")
            })

    }).catch((e) => { console.log(e) });

})

router.get("/remember/:token", (req, res) => {
    const token = req.params.token;

    User.findOne(
        {
            where: {
                tokenRefresh: token
            }
        }
    ).then(user => {
        if (user == undefined) {
            console.log("Email não encontrado")
        } else {
            res.render("users/senha", { token: token })
        }
    }).catch((e) => {
        console.log(e)
    })

})

router.post("/remember", (req, res) => {
    const email = req.body.email;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(email + Date.now(), salt).replaceAll("/", "");
    User.findOne(
        {
            where: { email: email }
        }
    ).then(user => {
        if (user == undefined) {
            console.log("Email não encontrado")
        } else {

            User.update({ email: email, tokenRefresh: hash }, { where: { email: email } })
                .then(() => {
                    var link = `http://localhost:3000/remember/${hash}`

                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: "wesleydefreiitas01@gmail.com",
                            pass: "otqz hwom clbl exsb"
                        }
                    });

                    // otqz hwom clbl exsb

                    function sendMail(link, to) {
                        const text = `Notamos que houve um acesso a sua conta, este é o link de redefinição de senha ${link}`;
                        transporter.sendMail({
                            from: "Wesley Freitas <wesleydefreiitas01@gmail.com>",
                            to: to,
                            subject: "Redefinir senha - UPPON",
                            text: text
                        }).then(message => {
                            console.log(message)
                            res.redirect("/login")
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    sendMail(link, email)
                })
                .catch((e) => { })

        }

    })

})

// Signup usuários

router.post("/users/create", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
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

                messageWhatsApp = `Olá ${name},

                Que bom ter você por aqui 🙂
                
                Sua conta no Uppon foi criada com sucesso!
                
                Acesse o nosso canal e saiba mais youtube.com/uppon
                
                Tem alguma dúvida?`;

                assunto = "Uppon - Conta criada com sucesso";

                messageEmail = `Olá ${name},

                Que bom ter você por aqui 🙂
                
                Sua conta no Uppon foi criada com sucesso!
                
                Acesse o nosso canal e saiba mais youtube.com/uppon
                
                Precisando pode chamar a nossa equipe no WhatsApp
                
                link do WhatsApp: https://wa.me/5585996310234
                
                Equipe Uppon`;

                //URL do cliente
                const host = "https://api.wppchat.com.br";
                //Token
                const token = "Bearer TESTE";
                //Dados do agente
                const body = {
                    "number": phone,
                    "body": messageWhatsApp
                }
                
                //Função que envia msg

                async function sendMessageWpp(body, token) {
                    const response = await fetch(`${host}/api/messages/send`, {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    })

                    const data = await response.json();

                    var token = data.token;
                }
                
                async function sendMessageWpp(body, token) {
                    const response = await fetch(`${host}/api/messages/send`, {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    })

                    const data = await response.json();

                    var token = data.token;
                }

                sendMessageWpp(body, token);
                sendMessageEmail();

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

router.post("/authenticate", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        //Verifica se existe um email com esse usuário
        if (user != undefined) {
            //Valida a senha
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    name: user.name,
                    id: user.id,
                    email: user.email
                }
                res.redirect("/dashboard");
            } else {
                res.redirect("/login");
            }

        } else {
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

