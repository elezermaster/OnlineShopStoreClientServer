const jwt = require('jsonwebtoken')

module.exports = function(role){
    return function(req,res, next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
               return res.status(401).json({message:"token auth error!"})
            }
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            if(decoded.role !== role){
                return res.status(403).json({message:"Not allowed! user not authorized!"})
            }
            req.user = decoded
            next()
        }catch(e){
            res.status(401).json({message:"user didnt authorised!"})
        }
    }  
}

//  for user login to get auth token
// send POST: localhost:7000/api/user/login
// {
//     "email": "user2@mail.ru",
//     "password": "123456"
// }
//for get admin user
// send POST: localhost:7000/api/user/registration
// {
//     "email": "user0admin1@mail.ru",
//     "password": "123456",
//     "role":"ADMIN"
// }
