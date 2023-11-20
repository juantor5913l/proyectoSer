import Ticket from "../models/tickets.js";

const agregar = async (req, res) => {
  try {
    const {
      idCategoria,
      idCliente,
      asuntoTicket,
      descripcionTicket,
      numeroTicket,
      correoTicket,
      estadoTicket,
    } = req.body;

    const nuevoTicket = new Ticket({
      idCategoria,
      idCliente,
      asuntoTicket,
      descripcionTicket,
      numeroTicket,
      correoTicket,
      estadoTicket,
    });

    await nuevoTicket.save();

    console.log("Ticket creado con éxito");
    res.json({ ok: "SI", msg: "Ticket creado con éxito" });
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    res.status(500).json({ ok: "NO", msg: "Error al crear el ticket" });
  }
};

const listar = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("idCategoria", { nombreCategoria: 1, _id: 0 })
      .populate("idCliente", { nombresUsuario: 1, _id: 0 });

    res.json(tickets);
  } catch (error) {
    console.error("Error al obtener la lista de tickets:", error);
    res.status(500).json({
      ok: "NO",
      msg: "Error al obtener la lista de tickets",
    });
  }
};

const eliminar = async (req, res) => {
  try {
    const ticketId = req.params.id;
    // Utiliza el método findByIdAndRemove para eliminar el ticket por su ID
    await Ticket.findByIdAndRemove(ticketId);

    console.log("Ticket eliminado con éxito");
    res.json({ ok: "SI", msg: "Ticket eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el ticket:", error);
    res.status(500).json({
      ok: "NO",
      msg: "Error al eliminar el ticket",
    });
  }
};

const editar = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const {
      idCategoria,
      idCliente,
      asuntoTicket,
      descripcionTicket,
      numeroTicket,
      correoTicket,
      estadoTicket,
    } = req.body;

    // Utiliza el método findByIdAndUpdate para editar el ticket por su ID
    await Ticket.findByIdAndUpdate(ticketId, {
      idCategoria,
      idCliente,
      asuntoTicket,
      descripcionTicket,
      numeroTicket,
      correoTicket,
      estadoTicket,
    });

    console.log("Ticket editado con éxito");
    res.json({ ok: "SI", msg: "Ticket editado con éxito" });
  } catch (error) {
    console.error("Error al editar el ticket:", error);
    res.status(500).json({
      ok: "NO",
      msg: "Error al editar el ticket",
    });
  }
};

const listarUno = async (req, res) => {
  try {
    const ticketId = req.params.id;
    // Utiliza el método findById para obtener un ticket por su ID
    const ticket = await Ticket.findById(ticketId)
      .populate("idCategoria", { nombreCategoria: 1, _id: 0 })
      .populate("idCliente", { nombresUsuario: 1, _id: 0 });

    res.json(ticket);
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
    res.status(500).json({
      ok: "NO",
      msg: "Error al obtener el ticket",
    });
  }
};

const listarPorCliente = async (req, res) => {
  try {
    const idCliente = req.params.idCliente;
    // Utiliza el método find para obtener todos los tickets del cliente específico
    const ticketsCliente = await Ticket.find({ idCliente })
      .populate("idCategoria", { nombreCategoria: 1, _id: 0 })
      .populate("idCliente", { nombresUsuario: 1, _id: 0 });

    res.json(ticketsCliente);
  } catch (error) {
    console.error("Error al obtener los tickets del cliente:", error);
    res.status(500).json({
      ok: "NO",
      msg: "Error al obtener los tickets del cliente",
    });
  }
};

export { agregar, listar, eliminar, editar, listarUno, listarPorCliente };
