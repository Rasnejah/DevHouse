import dotenv from 'dotenv'
dotenv.config()
import express from 'express' 
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import routes from './routes' 

class App {
  constructor (){
    this.server = express()
    
    const DBUser = process.env.DB_USER
    const DBPassword = process.env.DB_PASSWORD
    
    mongoose.connect(`mongodb+srv://${DBUser}:${DBPassword}@cluster0.skdgc.mongodb.net/?retryWrites=true&w=majority`,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })
  
    this.middleware()
    this.routes()

    }

  middleware (){

    this.server.use( cors() )
    this.server.use( express.json() )
    this.server.use(
      '/files',
      express.static( path.resolve( __dirname, '..', 'uploads') )
    )
  }

  routes (){
    this.server.use(routes)
  }

}

export default new App().server