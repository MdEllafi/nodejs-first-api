const mongoose = require('mongoose');

const subCategorySchema=new mongoose.Schema({
name:{
    type: String,
    trim:true,
    unique:[true,"Subcategory must be unique"],
    minlength:[2,"To short SubCategory name"],
    maxlength:[32,"To long subCategory name"], 
},
slug:{
    type:String,
    lowercase:true,
},
category:{
    type: mongoose.Schema.ObjectId,
    ref:"Category",
    required:[true,"subCategry must be belong to parent category"]
}
},
{timestamps:true}
);
module.exports=mongoose.model("SubCategory",subCategorySchema);