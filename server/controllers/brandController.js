const {Brand} = require('../model/models')
const ApiError = require('../error/ApiError')

class BrandController{
    async create(req,res){
        const {name} = req.body   
        const brand = await Brand.create({name})
        return res.json(brand)
        //localhost:7000/api/brand
        //body POST: {"name": "samsung"}
    }
    async getAll(req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
        //localhost:7000/api/brand
        //GET
    }
    async getOne(req,res){
        
    }
    async edit(req,res){
        
    }
    async erase(req,res){
        
    }
}

module.exports = new BrandController()