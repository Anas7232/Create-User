const express = require('express');
const {
    createUser, 
    login, 
    getAllUser, 
    getSingleUser, 
    deleteUser, 
    updateUser, 
    blockUser, 
    unBlockUser, 
    handlerCookie
} = require('../controller/user');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', login)
router.get('/all_user', getAllUser)
router.get('/get_all', authMiddleware,isAdmin , getSingleUser);
router.get('/ref', handlerCookie);

router.delete('/:id', deleteUser);
router.put('/edit_user',authMiddleware, updateUser);
router.put('/block_user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock_user/:id',authMiddleware,isAdmin, unBlockUser);

module.exports = router;