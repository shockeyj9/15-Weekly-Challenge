const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
} = require('../../controllers/userController');


// api/users
router.route('/').get(getUsers)

// api/thoughts/:userId
router.route('/:userId').get(getSingleUser)









module.exports = router;