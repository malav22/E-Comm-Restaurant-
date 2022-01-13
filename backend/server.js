const app = require('./app');

const dotenv = require('dotenv');

//config
dotenv.config({path:"backend/config/config.env"});

//Databse configuration
const connectDatabase = require('./config/database');
connectDatabase();

//Handling uncaught exceptions
process.on('uncaughtException', (err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception.");

    server.close(()=>{
        process.exit(1);
    });
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});

app.get('/', function(req, res){
    res.send("HelloWorld");
});
//Unhandled promise Rejections

process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection.");


    server.close(()=>{
        process.exit(1);
    });
});