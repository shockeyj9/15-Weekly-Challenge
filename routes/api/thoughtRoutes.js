const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createThought,
    addReaction
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought)

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(addReaction)






module.exports = router;