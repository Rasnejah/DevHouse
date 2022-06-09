import { Router } from "express" 

import multer from "multer"

import uploadConfig from "./config/upload"


import SessionController from "./controllers/SessionController"
import HouseController from "./controllers/HouseController"
import DashbordController from "./controllers/DashbordController"
import ReserveController from "./controllers/ReserveController"

const routes = new Router()
const upload = multer(uploadConfig)

routes.post( '/session', SessionController.store )

routes.get( '/houses', HouseController.index )
routes.post( '/houses', upload.single('thumbnail'), HouseController.store )
routes.put( '/houses/:house_id',upload.single( 'thumbnail'), HouseController.update )
routes.delete( '/houses', HouseController.destroy )

routes.get( '/dashboard', DashbordController.show )

routes.post( '/reservation', ReserveController.store )
routes.get( '/reservation', ReserveController.index )
routes.delete( '/reservation/:reserve_id/delete', ReserveController.destroy )


export default routes