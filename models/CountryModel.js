var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var countrySchema = new Schema({
  "code2"   : { type: String, default: ''  , index:true},
  "code3"	   : { type: String, default: '' },
  "name"     : { type: String, default: '' , index:true },
  "capital"     : { type: String, default: '' , index:true },
  "region"     : { type: String, default: '' , index:true},
  "subregion"     : { type: String, default: '' , index:true},
  "states"     : { type: Array, default: ''}
});


module.exports =  mongoose.model("countries", countrySchema , 'countries');

