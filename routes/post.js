const router = require('express').Router();
const controller = require('../controllers/post');
const {PostSchema,AllSchema} = require('../utils/schema');
const {
    validateBody, validateToken,validateParam
} = require('../utils/validator');
const { saveFile, updateFile } = require('../utils/gallery');

router.get('/', controller.all);
router.post('/', [validateToken, validateBody(PostSchema), saveFile, controller.add]);
router.route('/:id')
    .get(validateParam(AllSchema.id, 'id'), controller.get)
    .patch([validateToken, validateParam(AllSchema.id, 'id'), validateBody(PostSchema), updateFile, controller.update])
    .delete ([validateParam(AllSchema.id, 'id'), controller.drop]);
    
module.exports = router;
