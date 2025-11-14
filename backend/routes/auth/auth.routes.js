const express = require('express');
const {registerUser, loginUser, logOutUser, authMiddleware} = require('../../controllers/auth/auth.controler')

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',logOutUser)
router.get('/checkauth', authMiddleware, (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Usuario Verificado',
        user
    })
})

module.exports = router;