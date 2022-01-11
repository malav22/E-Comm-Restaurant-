const app = require('./app');

const dotenv = require('dotenv');

//config
dotenv.config({path:"backend/config/config.env"});

//Databse configuration
const connectDatabase = require('./config/database');
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});
