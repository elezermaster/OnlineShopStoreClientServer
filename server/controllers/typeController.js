const {Type} = require('../model/models')
const ApiError = require('../error/ApiError')

class TypeController{
    async create(req,res){
        const {name} = req.body   
        const type = await Type.create({name})
        return res.json(type)
        //localhost:7000/api/type
        //body POST: {"name": "smartphone"}
    }
    async getAll(req,res){
        const types = await Type.findAll()
        return res.json(types)
        //localhost:7000/api/type
        //GET
    }
    async getOne(req,res){
        
    }
    async edit(req,res){
        
    }
    async erase(req,res){
        
    }
}

module.exports = new TypeController()

