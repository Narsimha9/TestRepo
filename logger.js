
var express=require('express');
var app=express();
const uuid= require('uuid');
const appRoot=require('app-root-path')
app.use(httpContext.middleware);
var httpContext = require('express-http-context');
const winston=require('winston')
app.use((req, res, next) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    var requestId = req.headers["x-request-id"] || uuid.v1();
    global.httpContext.set("requestId", requestId);
    global.te=httpContext.get('requestId');
    next();
});

exports.work=()=>{

var options= {
    file: {
        level:'debug',
        filename:`${appRoot}/logs/app.log`,
        handleExceptions:true,
        json:true,
        maxsize:5254880, //5MB
        maxFiles:5,
        colorize:false,
        prettyPrint:true,
        timestamp: new Date().toLocaleString(),

    },
    console:{

        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true
    }
};

var winstonlogger=new winston.Logger({

        transports:[
                new
                winston.transports.File(options.file),
                new
                winston.transports.Console(options.console)
        ],
        exitOnError:false,

});

var formatMessage = function(message) {
    var reqId = httpContext.get('requestId');
    message = reqId ? message + " reqId: " + reqId : message;
    return message;
};

winstonlogger.stream={

    write: function(message,encoding){

        winstonlogger.info(formatMessage(message));
    }
};
return winstonlogger;
}
