const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
} = require('../../controllers/userController');


// api/users
router.route('/').get(getUsers).post(createUser)

// api/thoughts/:userId
router.route('/:userId').get(getSingleUser).put(updateUser)









module.exports = router;