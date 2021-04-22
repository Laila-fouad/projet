const City = require("../models/City");
const Country = require("../models/Country");
const Province = require("../models/Province");



module.exports = class Countries{


   static async getAllCountries(req,res){
      try {
         const country = await  Country.find();
         if(!country){
            res.status(404).json("There are no country published yet!")
          }
          res.json(country);
        } catch (error) {
          res.status(500).json({error: error})
        }
   }

   static async createCountry(req,res){
      try { 
         if (req.body.length > 0){
            const a=[];
            const b=[];
            for (let i = 0; i < req.body.length; i++) {
               const e = req.body[i];
               const c1 = await Country.findOne({name: e.name })
               const c2 = await Country.findOne( { code: e.code})
               if (c1 || c2){ 
                  a.push(req.body[i].name);
               }
               else{
                  await Country.insertMany(req.body[i])
                 b.push(req.body[i].name);
               }
            }
            res.send("Added countries : " + b + " \nExists Countries : " + a );
           }
          else{
           res.send("body not existed!") 
          }
    } catch (error) {
       res.status(500).json({error: error})
    }

   }

static async updateCountry(req,res){
   try {
      if(!req.body.id){
         res.send("Enter the id !")
      }
      if(!req.body.data){
         res.send("Enter the informations for update !")
      }
      const country = await Country.findOne({"_id" : req.body.id });
      if( !country){
         res.send("There is no country with this id !");
      }
      const result = await Country.findByIdAndUpdate(req.body.id, { $set: req.body.data } , { new : true });
      res.json(result);
   } catch (error) {
      res.status(500).send({error: error})
   }
} 
    
static async deleteCountry(req,res){
   try {
      if (req.body.length > 0){
         var a = [];
         var b = 0;
         for (let i = 0; i < req.body.length; i++) {
            const country = await Country.findOne({"_id": req.body[i].id});
            if(!country){
               b++;
            }else{
               await City.deleteMany({country : country._id});
            await Province.deleteMany({country : country._id})
            await Country.deleteOne({"_id": country.id})
            a.push(country.name);
            }
         }
         res.send( "Countries are deleted : " + a + "\nNot found : " + b)
      }else{
         res.send("data not existed!!")
      }
   }catch (error) {
      res.status(500).json({error: error})
   }
}
}