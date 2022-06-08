
import User from "../models/User"

class SessionController{

   async store(req, res){

    const { email } = req.body
    try {
      
      let user = await User.findOne({ email })
      if(user){
        return res.json({message: "Usuário Já cadastrado"})
      }
      user = await User.create({ email })
      return res.json( user)
    } catch (error) {
      return res.json({message: error})
    }
    

  }

}

export default new SessionController()