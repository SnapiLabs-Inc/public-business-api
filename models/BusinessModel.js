var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var businessSchema = new Schema({
  "business_name"   : { type: String, default: ''  , index:true},
  "category"	   : { type: String, default: '' },
  "category_2"     : { type: String, default: '' },
  "category_3"     : { type: String, default: '' },
  "address"     : { type: String, default: '' , index:true},
  "city"     : { type: String, default: '' , index:true},
  "state"     : { type: String, default: '' , index:true},
  "postal"     : { type: String, default: '' },
  "phone_number"     : { type: String, default: '', index:true },
  "website"     : { type: String, default: '' , index:true},
  "email"     : { type: String, default: '' , index:true},
  "latitude"     : { type: String, default: '' },
  "longitude"     : { type: String, default: '' },
  "date"		   : { type: Date, default: Date.now}
});


module.exports =  mongoose.model("business", businessSchema , 'business');

