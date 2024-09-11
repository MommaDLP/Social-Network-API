const router = require('express').Router();

//all functions
const{
    getThoughts,
    getSingleThought,
    createThoughts,
    deleteThoughts,
    updateThoughts,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtControllers')

//routes  for each type of request
router
.route('/')
.get(getThoughts)
.post(createThoughts);

router
.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThoughts)
.put(updateThoughts);

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);


module.exports = router;