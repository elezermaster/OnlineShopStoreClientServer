const ApiError =require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../model/models')

const generateJwt = (id, email, role)=>{
   return jwt.sign(
        {id, email,role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController{
    async registration(req,res,next){
        const {email,password,role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('error email or password !!!'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('error email user exists !!!'))
        }
        const hashpassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password:hashpassword}) 
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }
    async login(req,res, next){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('error user not exists!!!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('error password wrong!!!'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        //res.status(200).json({message: 'GET AUTH USER!!!'})
        const query = req.query
        // if(!query.id){
        //    //return next(ApiError.badRequest('ID is not typed !!!'))
        // }
        // if(query){
        //     res.json({message:"GOOD JOB!"})
        // }
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
        //localhost:7000/api/user/auth?id=5&message=kakaka
    }
    async edit(req,res){
        
    }
    async erase(req,res){
        
    }
}

module.exports = new UserController()