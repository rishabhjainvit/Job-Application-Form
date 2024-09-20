const jwt = require('jsonwbtoken')
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message: 'Unauthorized, JWT token is require'})
    }
    try{
        const decoded = jwt.verify(auth,process.env,JWT_SECERET);
        req.user = decoded;
        next();
    }catch(err){
        return  res.status(403)
        .json({message:'Uauthorizred,JWT token is require'})

    }
}
module.exports = ensureAuthenticated;