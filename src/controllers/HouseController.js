
import House from "../models/House"
import User from "../models/User"


class HouseControler {

  async index (req, res){
    const {status } = req.query

    try {
      
      const houses = await House.find({ status })
      
      if(houses.length === 0 ){

        return res.status(422).json({ massage: "Casa não encontrada"})

      }

      return res.json(houses)

    } catch (err) {

      return res.json(err.massage)

    }
  }

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

  async update (req, res){

    const { house_id } = req.params
    
    try {

      const house = await (await House.findOne({ _id: house_id }).distinct( 'user' )).toString()
      console.log(house)

      if( !house ){

        res.status( 422 ).json({ massage: "Casa não encontrada"})

      }

      const { filename } = req.file
      const { description, price, location, status} = req.body
      const { user_id } = req.headers      

      const user = await (await User.findById({ _id: user_id }).distinct( '_id' )).toString()
      
      if( user !== house ){
        return res.status( 422 ).json({ massage: "Você não tem permição para auterar essa casa!"})
      }

      await House.updateOne( { _id: house_id }, {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      })

      return res.json({ massage: "casa atualizada!"})

    } catch (error) {

      return res.status( 500 ).json( error.massage )

    }
    
    
    
  }

}

export default new HouseControler()

