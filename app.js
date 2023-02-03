const express= require('express');
const path=require('path');
var mongoose = require('mongoose');
const bodyparserr=require('body-parser');
const app=express();
const port =8000;
// mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/contactdance', );
var contactSchema = new mongoose.Schema({
    name:String,
    age:String,
    mobile:String,
    address:String
  });
app.use('/statics',express.static('static'));
app.set('view engine','pug');
  var contact = mongoose.model('contact',contactSchema);
  app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send(`This item has been saved to the database`)
    }).catch(()=>{
    res.status(400).send(`item was not saved to the databse`)
})
  });
//set the directory our file
app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=>{
    
    const params = {};
    res.status(450).render("home.pug",params);
});
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(450).render("contact.pug",params);
});

app.listen(port,()=>{
    console.log(`this application working succesfully try by yourself ${port}`);
});

