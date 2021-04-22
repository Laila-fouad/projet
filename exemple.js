const express = require('express');
const app = express();
// const countries = require('./routes/Country.routes');
// app.use('/api/country',countries);
app.listen(3000, () => console.log("Waiting for port 3000 ..."));
const mongoose = require('mongoose');
const Country = require('./controllers/country.controller');
const City = require('./models/City')
const Province = require('./controllers/province.controller')
mongoose.connect('mongodb://localhost/exemple')
.then(() => console.log("connected to mongoDB ..."))
.catch (err => console.log("could not connected to mongoDB ", err));

// City.createCity([{
//             name: "ouled teima",   
//             province : "6079759b53d69932c49fa03c",
//             country : "6079753bb1537b1bcc349277"
//          },{
//           name: "adrar",   
//           province : "6079759b53d69932c49fa03d",
//           country : "6079753bb1537b1bcc349278"
//        }]);


//  async function deleteCity(){
//     try {
//         var ct = ["taroudant","tiznit"];
//         var ab = [];
//         var i = 0;
//         ct.forEach(element => {
//             ab[i]=element.name;
//             i++;
//         });
//        await City.deleteMany({name :  {$in: ct}})
       
//         ab.forEach(async (e) => {
//            const c = await City.findOne({name : e})
//            console.log(c._id);
        
//         });
        
      
        
//     }catch (error) {
//        console.log({error: error})
//     }
//  }
//  deleteCity()

// var cities = [1,2,3,4];
// cities = cities.filter(e => e !== 1);
// console.log(cities)
//  async function createCity(){
//      var ct = [{
//         name: "ifni",   
//         province : "6079759b53d69932c49fa03c",
//         country : "6079753bb1537b1bcc349277"
//      },{
//       name: "tiznit",   
//       province : "6079759b53d69932c49fa03c",
//       country : "6079753bb1537b1bcc349277"
//    }];
//     try { 
//         const result = await City.insertMany(ct)
//         .then((elements) => {
//             elements.forEach(async (e) => {
//             const city = await City.findOne({name : e.name} );
//             const province = await Province.findOne({_id : e.province} );
//             var cities = province.cities;
//             cities.push(city._id);
//             const result1 = await Province.updateOne({ _id: e.province }, {
//                $set: { cities : cities } },{ new : true});
//                       console.log(result1);
//                 })
//             });
                  
//         console.log(result);
//     }catch (error) {
//           console.log({error: error})
//     }
//  }
//  createCity();



//   async function createCountry(){
//     try { 

//        const result = await Country.insertMany([{
//         name: "morocco",
//         code : "ma",
//         dialcode : "+212",
//         curency : "mad",   
//      },{
//         name: "algerie",
//         code : "dz",
//         dialcode : "+213",
//         curency : "dinar", 
//      }]);
//        console.log(result);
//     } catch (error) {
//           return({error: error})
//     }
//  }
//  createCountry();



//  async function createProvince(){
//     try { 
//        var pr = [{
//         name: "souss-massa",   
//         country : "60796ce521cf5c25209958b2",
//      },{
//         name: "adrar",   
//         country : "60796ce521cf5c25209958b3",
//      }];
//        var result = Province.insertMany(pr)
//        .then(  (elements) => {
//            elements.forEach( async e => {
//                 const country = await Country.findOne({_id : e.country} );
//         var provinces = country.provinces;
//         provinces.push(e._id);
//         const result1 = await Country.updateOne({ _id: e.country }, {
//            $set: { provinces : provinces } },{ new : true});
//            console.log(result1);
//         });
//           console.log(result);
//            });
       
//        } catch (error) {
//           console.log({error: error})
//        }
          
//     }
//     createProvince()