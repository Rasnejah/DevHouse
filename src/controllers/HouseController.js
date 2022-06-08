
class HouseControler {

  async store(req, res){

    return res.json({ ok: "house controler" })
  }

}

export default new HouseControler()