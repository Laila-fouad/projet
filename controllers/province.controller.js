const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");

module.exports = class Provinces{


   static async getAllProvinces(req,res){
      try {
         const country = await Country.findOne({code : req.params.name})
         const province = await  Province.find({country : country._id});
         if(!province){
            res.status(404).json("There are no province published yet!")
         }
         res.json(province);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }
   static async createProvince(req,res){
      try { 
         const country = await Country.findOne({code : req.params.name});
         if(!country){
            res.send( "There is no country with this name" )
         }
         if (req.body.length > 0){
            const a=[];
            const b=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const c1 = await Province.findOne({name: e.name })
               const c2 = await Province.findOne( { country:e.id})
               if (c1 && c2){ 
                  a.push(req.body[i].name);
               }
               else{
                  await Province.insertMany(req.body[i])
                 b.push(req.body[i].name);
               }
            }
            res.send("Added Provinces : " + b + " \nExists Provinces : " + a );
           }
          else{
           res.send("body not existed!") 
          }
    } catch (error) {
       res.status(500).json({error: error})
    }

   }

static async updateProvince(req,res){
   try {
      const country = await Country.findOne({code : req.params.name});
      if(!country){
         res.send( "There is no country with this name" )
      }
      if(!req.body.id){
         res.send("Enter the id !")
      }
      if(!req.body.data){
         res.send("Enter the informations for update !")
      }
      const province = await Province.findOne({"_id" : req.body.id });
      if( !province){
         res.send("There is no province with this id !");
      }
      const result = await Province.findByIdAndUpdate(req.body.id, { $set: req.body.data } , { new : true });
      res.json(result);
   } catch (error) {
      res.status(500).send({error: error})
   }
}
   
// static async deleteProvince(req,res){
//    try {
//       const country = await Country.findOne({code : req.params.name_c});
//       if(!country){
//          res.send( "There is no country with this name" )
//       }
//       if (req.body.length > 0){
//          var a = [];
//             const province = await Province.findOne({"_id": req.body.id});
//             if(!province){
//                res.send("province not existed with this id!!")
//             }
//             await Province.deleteOne({"_id": province.id})
//             a.push(province.name);
//          res.send( a + " are deleted" )
//       }else{
//          res.send("data not existed!!")
//       }
      
//    }catch (error) {
//       res.status(500).json({error: error})
//    }
// }


static async deleteProvince(req,res){
   try {
      const country = await Country.findOne({code : req.params.name});
      if(!country){
         res.send( "There is no country with this name" )
      }
      if (req.body.length > 0){
         var a = [];
         var b = [];

         for (let i = 0; i < req.body.length; i++) {
            const province= await Province.findOne({"_id":req.body[i].id})
            if(!province){
               b++;
            }else{
               var provinces= country.provinces;
               provinces = provinces.filter( e => e != String(province._id))
               await Country.updateOne({code : req.params.name},
                  {$set : {provinces : provinces }},{new:true}) 
            await City.deleteMany({province : province._id});
            await Province.deleteOne({"_id": province.id})
            a.push(province.name);
            }
         }
         res.send( "Provinces are deleted : " + a + "\nNot found : " + b)
      }else{
         res.send("data not existed!!")
      }
   }catch (error) {
      res.status(500).json({error: error})
   }
}
}