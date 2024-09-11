const router = require('express').Router()

//functions from controllers'
const {
    getUsers,
    getSingleUser,
    createUsers,
    deleteUsers,
    updateUsers,
} = require('../../controllers/usercontrollers');

//set up routes forr requesst/function
router.route('/:userId')
        .get(getSingleUser)
        .delete(deleteUsers)
        .put(updateUsers);

router.route('/')
      .get(getUsers)
      .post(createUsers)

module.exports = router;  