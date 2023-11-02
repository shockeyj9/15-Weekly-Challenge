const router = require('express').Router();
const postRoutes = require('./thoughtRoutes');
const commentRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
