const router = require('express').Router();

//all functions
const{
    getThoughts,
    getSingleThought,
    createThoughts,
    deleteThoughts,
    updateThoughts,
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

module.exports = router;