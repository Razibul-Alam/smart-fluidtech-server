var express = require('express');
var app = express();
require('dotenv').config();
const dotenv = require('dotenv')
const port=process.env.PORT || 5000;
const cors =require("cors");
const bodyParser=require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId


app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


// connect node with mongodb
const uri = "mongodb+srv://smartFluidTech:smartfluidtech2021@cluster0.aicgl.mongodb.net/smart-fluidtech?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// database connection
client.connect(err => {
  const collection = client.db("smart-fluidtech").collection("stock-list");
  const categoyCollection = client.db("smart-fluidtech").collection("pump-category");
  const deliveryCollection = client.db("smart-fluidtech").collection("delivery-collection");

// data send from react form
  app.post('/addProduct',(req,res)=>{
    console.log(req.body)
    const items=req.body.data
    categoyCollection.insertOne(items,(err,docs)=>{
      if (err) {
        console.log(err)
      }else{res.send(docs)}
    })

  })
  // ----------
// data send from react form
  app.post('/addBanner',(req,res)=>{
    
    const items=req.body
    console.log(items)
    collection.insertOne(items,(err,docs)=>{
      if (err) {
        console.log(err)
      }else{res.send(docs)}
    })

  })
  // ----------
// delivery product send from delivery submit component
  app.post('/addDeliveryProduct',(req,res)=>{
    console.log(req.body)
    const items=req.body
    deliveryCollection.insertOne(items,(err,docs)=>{
      if (err) {
        console.log(err)
      }else{res.send('hello')}
    })

  })
  app.post('/addName',(req,res)=>{
   const item={'Name':'raju'}
    deliveryCollection.insertOne(item,(err,docs)=>{
      if (err) {
        console.log(err)
      }else{res.send(docs)}
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
  // all delivery items send to fronend
  app.get('/allDeliveryList',(req,res)=>{
    deliveryCollection.find({}).toArray((err,result)=>{
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
    console.log(id)
    categoyCollection.deleteOne({ 
      _id:ObjectId(`${id}`)
    })
    .then(function(result) {
      
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
// .....
// get some pump by model-cc30806
app.get('/loadPump/:id',(req,res)=>{
  const item=req.params.id
  console.log(item)
  categoyCollection.find({model:item}).toArray((err,result)=>{
    if (err) {
      console.log(err)
    }else{res.send(result)}
  })
})
// .....
// get some pump by model-cc30806 2
app.get('/takePump/:id',(req,res)=>{
  const item=req.params.id
  console.log(item)
  categoyCollection.find({serial:item}).toArray((err,result)=>{
    if (err) {
      console.log(err)
    }else{res.send(result)}
  })
})
// .....

// delivery database dynamic api
// get some pump by category
app.get('/showPump/:id',(req,res)=>{
  const item=req.params.id
  console.log(item)
  deliveryCollection.find({category:item}).toArray((err,result)=>{
    if (err) {
      console.log(err)
    }else{res.send(result)}
  })
})
// .....

  });
  // database connection end

//  root api
app.get('/', (req, res)=> {
  res.send('hello')
}).listen(port,()=>{
    console.log(`the server is running`)
})


