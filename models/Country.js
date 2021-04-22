const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountrySchema = new Schema({
    name : {
        type:String ,
        required : true,
        lowercase : true,
        trim : true    
    },
    code : {
        type:String ,
        required : true, 
        lowercase : true,
    },
    dialcode : {
        type:String , 
        required : true, 
        lowercase : true,
    },
    curency :  {
        type:String , 
        required : true, 
        lowercase : true,
        trim : true
    },
    
    provinces: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Province'
        }
    ],
  });
 
  const Country = mongoose.model('country', CountrySchema);
  module.exports = Country;