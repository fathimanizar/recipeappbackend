const express = require('express');
const cors = require('cors');
const cuisineModel = require('./models/cuisineDb');
const recipeModel = require('./models/recipeDb');
const path = require('path'); 
const incredientModel = require('./models/incredientDb');


const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build'))); 

//....................... TO ADD CUISINE..........................
app.post('/api/addcuisine',async(req,res)=>{
    var data = await new cuisineModel(req.body);
    data.save();
    res.send({status:"Cuisine is added"});
})

//....................... TO VIEW CUISINES..........................
app.get('/api/viewcuisines',async(req,res)=>{
    var data = await cuisineModel.find();
    res.json(data);
})

// ..................TO VIEW CUISINE BY NAME.............
app.get('/api/viewcuisine/:name',async(req,res)=>{
    let name = req.params.name;
    var data =  await cuisineModel.find({"cuisine_name":name});
    res.json(data); 
}) 

// ..................TO VIEW INCREDIENT BY RECIPE NAME.............
app.get('/api/viewincredients/:name',async(req,res)=>{
    let name = req.params.name;
    var data =  await incredientModel.find({"recipe_name":name});
    res.json(data); 
}) 


//..................TO ADD A NEW RECIPE.............................. 
app.post('/api/addrecipe',async(req,res)=>{
    var data = await new recipeModel(req.body);
    data.save();
    res.send({status:"Recipe is added"});
})

// ..................TO VIEW RECIPES BY CUISINE NAME.............
app.get('/api/viewrecipes/:name',async(req,res)=>{
    let name = req.params.name;
    var data =  await recipeModel.find({"cuisine_name":name});
    res.json(data); 
}) 

// ..................TO VIEW RECIPE ON SEARCH.............
app.get('/api/searchrecipe/:name',async(req,res)=>{
    let name = req.params.name;
    var data =  await recipeModel.find({ "recipe_name": name});
    res.json(data); 
}) 

// ...............TO DELETE A RECIPE.......................
app.delete('/api/deleterecipe/:id',async(req,res)=>{
    let id = req.params.id;
    await recipeModel.findByIdAndDelete(id);
    res.send({status:"Recipe is deleted"});
})

// .............TO UPDATE A RECIPE.......................
app.put('/api/updaterecipe/:id',async(req,res)=>{
    let id = req.params.id;
    await recipeModel.findByIdAndUpdate(id,req.body);
    res.json({status:"Recipe is updated"});
})

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname,'/build/index.html')); }); 

app.listen(3003,()=>{
    console.log("Server is up and running at 3003!!!");
})