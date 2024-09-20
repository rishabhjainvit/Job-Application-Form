// const { signup, login } = require('../Controllers/Authcontroller');
// const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const ensureAuthenticated = require('../Middlewares/auth');

const router = require('express').Router;

// router.post('/login',(req,res)=>{
//     res.send('login sucess');
// });

router.get('/',ensureAuthenticated , (req,res)=>{
    console.log('----logged in user detail-----',req.user);
    res.status(200).json([
    {
        name: "mobile",
        price: 10000
       },
       {
        name: "tv",
        price: 20000
       }

    ])
});
router.post('/signup',signupValidation, signup);

module.exports = router;