const express = require("express");
const router = express.Router();
const Integration = require("../integration/Integration")
const Execution = require("../executions/Execution")
const userAuth = require("../middleware/userAuth");

router.get("/", (req, res) => {
    res.render("users/login")
})

router.get("/executions/:id", userAuth, (req, res) => {

    var id = req.params.id;
    Execution.findAll({
        where: {
            integrationId: id
        }
    }).then(executions => {
        res.render("executions/list", { executions: executions, user: req.session.user })
    })
})

router.get("/dashboard", userAuth, (req, res) => {
    Execution.findAll().then(executions => {

        Integration.findAll().then(integrations => {
            console.log({ integrations: integrations, executions: executions, user: req.session.user })
            res.render("dashboard", { integrations: integrations, executions: executions, user: req.session.user })
        })
    })
});

// router.get("/executions", userAuth, (req, res) => {
//     Integration.findAll().then(integrations => {
//        console.log( { integrations: integrations, name :req.session.user })
//         res.render("executions",{ integrations: integrations, user:req.session.user })
//       })
// });

// router.get("/admin/articles/new", userAuth ,(req ,res) => {
//     Category.findAll().then(categories => {
//         res.render("admin/articles/new",{categories: categories})
//     })
// })

// router.post("/articles/save", userAuth, (req, res) => {
//     var title = req.body.title;
//     var body = req.body.body;
//     var category = req.body.category;

//     Article.create({
//         title: title,
//         slug: slugify(title),
//         body: body,
//         categoryId: category
//     }).then(() => {
//         res.redirect("/admin/articles");
//     });
// });


// router.post("/articles/delete", userAuth , (req, res) => {
//     var id = req.body.id;
//     if(id != undefined){
//         if(!isNaN(id)){
//             Article.destroy({
//                 where: {
//                     id: id
//                 }
//             }).then(() => {
//                 res.redirect("/admin/articles");
//             });
//         }else{// NÃO FOR UM NÚMERO
//             res.redirect("/admin/articles");
//         }
//     }else{ // NULL
//         res.redirect("/admin/articles");
//     }
// });

// router.get("/admin/articles/edit/:id", userAuth , (req, res) => {
//     var id = req.params.id;
//     Article.findByPk(id).then(article => {
//         if(article != undefined){
//             Category.findAll().then(categories => {
//                 res.render("admin/articles/edit", {categories: categories, article: article})

//             });
//         }else{
//             res.redirect("/");
//         }
//     }).catch(err => {
//         res.redirect("/");
//     });
// });

// router.post("/articles/update", userAuth, (req, res) => {
//     var id = req.body.id;
//     var title = req.body.title;
//     var body = req.body.body;
//     var category = req.body.category

//     Article.update({title: title, body: body, categoryId: category, slug:slugify(title)},{
//         where: {
//             id: id
//         }
//     }).then(() => {
//         res.redirect("/admin/articles");
//     }).catch(err => {
//         res.redirect("/");
//     });
// });

// router.get("/articles/page/:num",(req, res) => {
//     var page = req.params.num;
//     var offset = 0;

//     if(isNaN(page) || page == 1){
//         offset = 0;
//     }else{
//         offset = (parseInt(page) - 1) * 4;
//     }

//     Article.findAndCountAll({
//         limit: 4,
//         offset: offset,
//     }).then(articles => {
//         var next;
//         if(offset + 4 >= articles.count){
//             next = false;
//         }else{
//             next = true;
//         }

//         var result = {
//             page: parseInt(page),
//             next: next,
//             articles : articles
//         }

//         Category.findAll().then(categories => {
//             res.render("admin/articles/page",{result: result, categories: categories})
//         });
//     })


// });

module.exports = router;