// En tu archivo ticketsRoutes.js
import express from "express";
import { listar, listarUno, agregar, editar, eliminar, listarPorCliente } from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", listar);
router.get("/:id", listarUno);
router.get("/cliente/:idCliente", listarPorCliente);
router.post("/", agregar);
router.put("/:id", editar);
router.delete("/:id", eliminar);

export default router;
