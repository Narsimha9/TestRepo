

const express=require('express');
const app=express();
var express_logger = require('./express-logger-unique-req-id');

const morgan=require('morgan')
var winston=require('./winston')

app.use(morgan('combined',{stream:winston.stream}))

express_logger.initializeLogger(app);;
let logger = express_logger.getLogger()

//logger.debug('First message');

app.get('/test',(req,res)=>
{
res.send("testing done");
logger.info('get')
})
app.post('/work',(req,res) =>
{    
    res.send("ok")
    logger.info('post')
})
app.get('/',(req,res) =>{
console.log("hello")
  res.send("hello world")
  
})
app.listen((process.env.PORT || 5000), function() {
    console.log('listening on 5000..');
  })

  module.exports=app;
  
















  /*const express=require('express');
const app=express();

const uuid= require('uuid');
const httpContext = require('express-http-context');
const logger=require('./logger')



app.get('/test',(req,res)=>
{
res.send("testing done");
})
app.post('/work',(req,res) =>
{    
    res.send("ok")
})
app.listen((process.env.PORT || 5000), function() {
    console.log('listening on 5000..');
  })

console.log(logger.work(app))


module.exports=app;*/

