const router = require('express').Router();
const controller = require('../controllers/user');
const { RegisterSchema,LoginSchema } = require('../utils/schema');
const { validateBody} = require('../utils/validator');

router.post('/register', validateBody(RegisterSchema), controller.register)
router.post('/login', validateBody(LoginSchema), controller.login)

module.exports = router;