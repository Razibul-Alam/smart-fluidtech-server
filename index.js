var express = require('express');
var app = express();
// require('dotenv').config();
// const dotenv = require('dotenv')
// const port=process.env.PORT || 5000;
const cors =require("cors");
const bodyParser=require("body-parser");
const MongoClient = require('mongodb').MongoClient;


app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


// connect node with mongodb
const uri = "mongodb+srv://smartFluidTech:smartfluidtech2021@cluster0.aicgl.mongodb.net/smart-fluidtech?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("smart-fluidtech").collection("stock-list");
  const categoyCollection = client.db("smart-fluidtech").collection("pump-category");
// data send from react form
  app.post
  ('/addProduct',(req,res)=>{
    console.log(req.body)
    const items=req.body.data
    categoyCollection.insertOne(items,(err,docs)=>{
      if (err) {
        console.log(err)
      }else{console.log('inserted')}
    })

  })
  // ----------
  // data send to fronend
  app.get('/loadAllData',(req,res)=>{
    collection.find({}).toArray((err,result)=>{
      if (err) {
        console.log(err)
      }else{res.send(result)}
    })
  })
  // ---------
  // load single data
  app.get('/singleData/:id',(req,res)=>{
    const id=req.params.id
    collection.find({id:`${id}`}).toArray((err,result)=>{
      if (err) {
        console.log(err)
      }else{res.send(result)}
    })
  })
  // ---------
  // delete single data
  app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    collection.deleteOne({ 
      id:id
    })
    .then(function(result) {
      // process result
    })
    // ......

  })
   // get all pumps from pump category
     // data send to fronend
     app.get('/getPumps',(req,res)=>{
      categoyCollection.find({}).toArray((err,result)=>{
        if (err) {
          console.log(err)
        }else{res.send(result)}
      })
    })
//  -------
// get some pump by category
app.get('/getPump/:id',(req,res)=>{
  const item=req.params.id
  console.log(item)
  categoyCollection.find({category:item}).toArray((err,result)=>{
    if (err) {
      console.log(err)
    }else{res.send(result)}
  })
})

  });

 
app.get('/', (req, res)=> {
  res.send('hello')
}).listen(5000,()=>{
    console.log(`the server is running`)
})
