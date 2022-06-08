import dotenv from 'dotenv'
dotenv.config()
import express from 'express' 
import mongoose from 'mongoose'
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
    this.server.use( express.json() )
  }

  routes (){
    this.server.use(routes)
  }

}

export default new App().server