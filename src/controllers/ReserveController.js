
import Reserve from "../models/Reserve";
import House from "../models/House";

class ReserveController{

  async store ( req, res ){

    res.json({ ok: true })

  }

}

export default new ReserveController()