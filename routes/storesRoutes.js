import {Router} from "express";
import { buscarTienda, crearTienda, actualizarTienda, borrarTienda} from "../Controllers/tiendas.controllers.js";

const storesRouter = Router();

storesRouter.get("/:nombre", buscarTienda);
storesRouter.post("/", crearTienda);
storesRouter.put("/:nombre", actualizarTienda);
storesRouter.delete("/:nombre", borrarTienda);

export default storesRouter