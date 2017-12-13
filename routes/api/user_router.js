const router = require('koa-router')();
const User = require('../../app/controllers/user_controller');

router.get('/getUser', User.getUser);
router.post('/registerUser', User.registerUser);

module.exports = router;