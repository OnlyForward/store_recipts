const router = require('express').Router();
const recipe = require('./controllers/recipe');
const multer = require('multer');

router.get('/', recipe.getIndex);
router.get('/create/', recipe.getCreate);
router.post('/create/', recipe.postCreate);
router.post('/update/', recipe.postUpdate);
router.post('/remove/', recipe.postDelete);
router.get('/update/:productId', recipe.getUpdate);
router.get('/list/', recipe.getList);
router.get('/about/', recipe.getAbout);
router.get('/description/:productId', recipe.getDescription);

module.exports = router;