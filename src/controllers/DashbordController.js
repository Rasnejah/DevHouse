
import res from "express/lib/response";
import House from "../models/House";

class DashboardController{

  async show ( req, res ){

    const { user_id } = req.headers

    try {
      
      const houses = await House.find({ user: user_id })
      res.json(houses)

    } catch (error) {

      return res.status( 500 ).json( error.message)

    }    

  }

}

export default new DashboardController()