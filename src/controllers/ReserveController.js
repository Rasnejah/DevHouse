
import Reserve from "../models/Reserve";
import House from "../models/House";

class ReserveController{

  async store ( req, res ){

    const { user_id } = req.headers
    const { date, house_id } = req.body

    if( date === "" ){

      return res.status( 422 ).json({ message: "preencha o campo data!"})

    }

    if( house_id === ""){

      return res.status( 422 ).json({ message: "preencha o campo casa!"})

    }

    try {

      const house = await await House.findById( house_id )
      
      if( String(house.user) === user_id ){

        return res.status( 422 ).json({ message: "Reserva não autorizada!"})

      }

      if( !house.status ){

        return res.status( 422 ).json({ message: "Casa não disponivel!"})

      }

      const reserve = await Reserve.create({
        date,
        user: user_id,
        house: house_id
      })

      await reserve.populate('house')
      await reserve.populate( 'user')      

      return res.json(reserve)

    } catch (error) {
      
      return res.status( 500 ).json(error.message)

    }    

  }

  async index ( req, res ){

    const { user_id } = req.headers

    try {
      
      const reserve = await Reserve.find({ user: user_id}).populate( 'house')

      res.json( reserve )

    } catch (error) {

      return res.status( 500 ).json(error.message)

    }
    
  }

  async destroy ( req, res){

    const { user_id } = req.headers
    const { reserve_id } = req.params

    try {

      const reserve = await Reserve.findById( reserve_id )

      if( !reserve ){

        return res.status( 422 ).json({ message: "reserva não encontrada"})

      }
      const user = String(reserve.user)
      
      if( user !== user_id ){

        return res.status( 422 ).json({ message: "não autorizado!"})

      }

      await Reserve.findByIdAndDelete({ _id:reserve_id })

      res.json({ message: "deletado com sucesso" })

    } catch (error) {

      return res.status( 500 ).json( error.message )

    }
    
  }

}

export default new ReserveController()