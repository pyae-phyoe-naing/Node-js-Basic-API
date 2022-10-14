const router = require('express').Router();
const controller = require('../controllers/post');
const {PostSchema,AllSchema} = require('../utils/schema');
const {
    validateBody, validateToken,validateParam
} = require('../utils/validator');
const { saveFile, updateFile } = require('../utils/gallery');

router.get('/', controller.all);
router.post('/', [validateToken, validateBody(PostSchema), saveFile, controller.add]);

router.get('/cat/:id', validateParam(AllSchema.id, 'id'), controller.byCatId);
router.get('/tag/:id', validateParam(AllSchema.id, 'id'), controller.byTagId);
router.get('/user/:id', validateParam(AllSchema.id, 'id'), controller.byUserId);
router.get('/paginate/:page', [validateParam(AllSchema.page, "page"), controller.paginate]);
router.get('/like/toggle/:id/:likeCheck', [validateParam(AllSchema.id, 'id'),validateParam(AllSchema.likeCheck,'likeCheck'), controller.toggleLike]);

router.route('/:id')
    .get(validateParam(AllSchema.id, 'id'), controller.get)
    .patch([validateToken, validateParam(AllSchema.id, 'id'), validateBody(PostSchema), updateFile, controller.update])
    .delete ([validateParam(AllSchema.id, 'id'), controller.drop]);
    
module.exports = router;
