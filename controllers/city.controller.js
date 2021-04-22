const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Cities{
   static async getAllCities(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c})
         const province = await Province.findOne({name : req.params.name_pr})
         const city = await  City.find({country : country._id, province: province._id});
         if(!city){
            res.status(404).json("There are no city published yet!")
         }
         res.json(city);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }
  
   static async createCity(req,res){
      try { 
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         if (req.body.length > 0){
            const a=[];
            const b=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const c1 = await City.findOne({name: e.name })
               const c2 = await City.findOne( {province: e.id})
               const c3 = await City.findOne({cuntry:e.id})
               if (c1 && c2 && c3){ 
                  a.push(req.body[i].name);
               }
               else{
                  await City.insertMany(req.body[i])
                 b.push(req.body[i].name);
               }
            }
            res.send("Added Cities : " + b + " \n Exists Cities : " + a );
           }
          else{
           res.send("body not existed!") 
          }
    } catch (error) {
       res.status(500).json({error: error})
    }

   }
  
   static async updateCity(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         if(!req.body.id){
            res.send("Enter the id !")
         }
         if(!req.body.data){
            res.send("Enter the informations for update !")
         }
         const city = await City.findOne({"_id" : req.body.id });
         if( !city){
            res.send("There is no city with this id !");
         }
         const result = await City.findByIdAndUpdate(req.body.id, { $set: req.body.data } , { new : true });
         res.json(result);
      } catch (error) {
         res.status(500).send({error: error})
      }
   }


   static async deleteCity(req,res){
      try {
         const country = await Country.findOne({code : req.params.name_c});
         if(!country){
            res.send( "There is no country with this name" )
         }
         const province = await Province.findOne({name : req.params.name_pr});
         if(!province){
            res.send( "There is no province with this name" )
         }
         if (req.body.length > 0){
            var a = [];
            for (let i = 0; i < req.body.length; i++) {
               const city = await City.findOne({"_id": req.body[i].id});
               if(!city){
                  res.send("city not existed with this id!!")
               }
               var cities = await province.cities;
               cities = cities.filter( e => e != String(city._id))
               await Province.updateOne({ name : req.params.name_pr}, {
                  $set: { cities : cities } },{ new : true}
               );
               await City.deleteOne({"_id": city.id})
               a.push(city.name);
            }
            res.send( a + " are deleted" )
         }else{
            res.send("data not existed!!")
         }
         
      }catch (error) {
         res.status(500).json({error: error})
      }
   }
}