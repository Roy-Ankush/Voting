import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import user from '../models/user.js';
import userroute from '../routes/userRoutes.js'
import candidateroute from '../routes/candidateRoutes.js';
import {verifyToken} from '../middleware/auth.js'


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true,
  methods:"GET,PUT,POST,DELETE"
}
))



//Database connectivity
const connectionString = "mongodb://localhost:27017/votingApp";
const connect_Database = async () => {
  try {
    const client = await mongoose.connect(connectionString, { });
    console.log(`Connected to MongoDB.....`);
    return client;
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}
connect_Database()
//with the help of db we have created an instance of monsoose.connection
const db=mongoose.connection;
// connected, error and disconnected are the preefinec method in mongodb
db.on('connected',()=>{
  console.log("Database connected successfully")
})
db.on('error',()=>{
  console.log("Error connecting database")
})
db.on('disconnected',()=>{
  console.log("Database disconnected successfully")
})


app.use('/api/user',userroute)
app.use('/candidate',verifyToken,candidateroute)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })