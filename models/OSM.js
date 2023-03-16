const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OSM = new Schema({

  osNumber:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  model:{
    type:String,
    required:true
  },
  issue:{
    type:String,
    required:true
  },
  enterDate:{
    type:String,
    required:true
  },
  exitDate:{
    type:String,
    default(){
    
      return new Date("2015-03-25");
    }
  },
  value:{
    type:Number,
    required:true
  }
  
});

mongoose.model("osm",OSM);