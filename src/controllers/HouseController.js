import { json } from "express/lib/response"
import House from "../models/House"
import User from "../models/User"


class HouseControler {

  async store(req, res){

    const { filename } = req.file
    const { description, price, location, status} = req.body
    const { user_id } = req.headers 
    
    let user = await User.findOne({ _id: user_id})
    if(!user){
      return res.json({ massage: "Usuário não cadastrado"})
    }
    
    try {

      const house = await House.create({

        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,

      })

      return res.json(house)
      
    } catch (err) {

      return res.json(err.massage)

    }
  }

}

export default new HouseControler()

