const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Fathimanizar:fathima@testcluster.cv1hp4e.mongodb.net/recipeappDB?retryWrites=true&w=majority")
 .then(()=>{
console.log("Incredient DB connected");
 })
 .catch(err=>console.log(err));

 let mongoSchema= mongoose.Schema;

 const IncredientSchema = new mongoSchema({
  
    recipe_name:String,
    recipe_image:String,
    incredients:String,
    steps:String

 })

 var incredientModel= mongoose.model("incredient",IncredientSchema);

 module.exports = incredientModel;