const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String , 
        required : true, 
        lowercase : true,
        trim : true
    },
    province: {
          type: Schema.Types.ObjectId, 
          ref: 'Province'
      },
    country: {
        type: Schema.Types.ObjectId, 
        ref: 'Country'
    }
  });


const City = mongoose.model('city', CitySchema);
module.exports=City;