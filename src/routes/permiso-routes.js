import express from "express";
import {
  obtenerPermisos,
  obtenerPorUsuario,
  obtenerPermisoPorId,
  crearPermiso,
  actualizarPermiso,
  eliminarPermiso,
} from "../controllers/permiso-controller.js";
import {
  autenticar,
  autorizarAdmin,
  verificarPermiso,
} from "../middlewares/autenticador-validator.js";

const routerPermisos = express.Router();

// Rutas protegidas para administradores
routerPermisos.get("/", autenticar, autorizarAdmin, obtenerPermisos);
routerPermisos.get(
  "/usuario/:id",
  autenticar,
  autorizarAdmin,
  obtenerPorUsuario
);
routerPermisos.post("/", autenticar, autorizarAdmin, crearPermiso);
routerPermisos.put("/:id", autenticar, autorizarAdmin, actualizarPermiso);
routerPermisos.delete("/:id", autenticar, autorizarAdmin, eliminarPermiso);
routerPermisos.get(
  "/:id",
  autenticar,
  autorizarAdmin,
  obtenerPermisoPorId
);

export default routerPermisos;
