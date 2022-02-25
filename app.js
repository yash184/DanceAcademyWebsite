const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

async function getData(){
await mongoose.connect('mongodb://localhost:27017/ContactDance');

}
const port = 8000;

//Define mongoose scema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

// Express Specific Stuff
app.use('/static', express.static('static')); // for serving static
app.use(express.urlencoded());

// Pug specific Stuff
app.set('view engine', 'pug'); //set a template engine as a plug
app.set('views', path.join(__dirname, 'views')); //set the view directory

//End Points
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.get('/events', (req, res)=>{
    const params = {}
    res.status(200).render('events.pug', params);
});
app.get('/styles', (req, res)=>{
    const params = {}
    res.status(200).render('styles.pug', params);
});
app.get('/classschedule', (req, res)=>{
    const params = {}
    res.status(200).render('classschedule.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    //res.status(200).render('contact.pug',params);
});

// Start the Server
app.listen(port,()=>{
    console.log(`The application started sucessfully on port ${port}`);
});