const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Country = require('../controllers/country.controller');
const City = require('../controllers/city.controller')
const Province = require('../controllers/province.controller')

mongoose.connect('mongodb://localhost/Data' , {useUnifiedTopology: true, useNewUrlParser: true } )
.then(() => console.log("connected to mongoDB ..."))
.catch (err => console.log("could not connected to mongoDB ", err));

router.get('/', Country.getAllCountries);
router.post('/',Country.createCountry);
router.delete('/',Country.deleteCountry);
router.put('/',Country.updateCountry);

router.get('/:name', Province.getAllProvinces);
router.post('/:name', Province.createProvince);
router.delete('/:name',Province.deleteProvince);
router.put('/:name',Province.updateProvince);

router.get('/:name_c/:name_pr',City.getAllCities);
router.post('/:name_c/:name_pr',City.createCity);
router.delete('/:name_c/:name_pr',City.deleteCity);
router.put('/:name_c/:name_pr',City.updateCity);

module.exports=router;