var a = 0;
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const Recipe_steps = require('../models/recipe_steps');
const Recipe = require('../models/Recipe');
const multer = require('multer');

exports.getIndex = (req, res, next) => {
    res.render('index');
}
//{ where: { id: productId } }
exports.getDescription = (req, res, next) => {
    const productId = req.params.productId;
    Recipe.findByPk(productId).then(recipe => {
        recipe.getSteps().then(steps => {
            res.render('description', { recipe: recipe, steps: steps });
        });
    });
}

exports.getUpdate = (req, res, next) => {
    const productId = req.params.productId;
    Recipe.findByPk(productId).then(recipe => {
        recipe.getSteps().then(steps => {
            res.render('create', { action: true, recipe: recipe, steps: steps });
        });
    });
}

exports.getCreate = (req, res, next) => {
    res.render('create', { action: false });
}

exports.getList = (req, res, next) => {
    Recipe.findAll().then(recipes => {
        console.log(recipes)
        res.render('list', { items: recipes });
    })

}


exports.getAbout = (req, res, next) => {
    res.render('about');
}

exports.postCreate = (req, res, next) => {
    const description_step = req.body.description_step;
    const description = req.body.description;
    const title = req.body.name;
    const image = req.files;
    const image_steps = req.body.imageUrl_step;
    const image_desc_path = image.imageUrl[0].path;
    console.log(image);

    console.log(title);
    req.title = title;

    const recipe = new Recipe({
        title: title,
        description: description,
        imageUrl: image_desc_path
    });




    recipe.save().then(result => {
        Recipe.findByPk(result.dataValues.id).then(user => {
            for (let i = 0; i < image.imageUrl_step.length; i++) {
                user.createStep({
                    description: description_step[i],
                    imageUrl: image.imageUrl_step[i].path,
                    step: i
                }).then(result => {
                    console.log(result);
                }).catch(err => console.log(err));
            }

        })
    })

    res.redirect('/');
}

exports.postUpdate = (req, res, next) => {
    const description_step = req.body.description_step;
    const description = req.body.description;
    const title = req.body.name;
    const image = (Array.isArray(req.files.imageUrl_step)) ? req.files : []
    const image_steps = req.body.imageUrl_step;
    const porductId = req.body.productId;

    Recipe.findByPk(porductId).then(recipe => {
        recipe.description = description;
        recipe.title = title;
        const image_desc_path = (Array.isArray(image.imageUrl)) ? image.imageUrl[0].path : recipe.imageUrl;
        recipe.imageUrl = image_desc_path;
        recipe.getSteps().then(steps => {
            console.log(`steps for update ${steps}`);
            for (let i = 0; i < steps.length; i++) {
                steps[i].description = description_step[i];
                steps[i].imageUrl = (Array.isArray(image.imageUrl)) ? image.imageUrl_step[i].path : steps[i].imageUrl;
                steps[i].save().then(result => {
                    console.log(result);
                })
            }
        });
        recipe.save().then(result => {
            res.redirect('/list/');
        });
    })
}

exports.postDelete = (req, res, next) => {
    const prodId = req.body.productId;
    Recipe.findByPk(prodId).then(product => {
        return product.destroy();
    }).then(result => {
        console.log(result);
        res.redirect('/');
    }).catch(err => console.log(err));
}