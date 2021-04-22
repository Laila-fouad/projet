const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
    name: {
        type: String , 
        required : true, 
        lowercase : true,
        trim : true
    },
    cities: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'City'
        }
    ],
    country: {
            type: Schema.Types.ObjectId, 
            ref: 'Country'
        },
  });

  const Province = mongoose.model('province', ProvinceSchema);
  module.exports = Province;
