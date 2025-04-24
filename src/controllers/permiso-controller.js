import PermisoService from "../services/permiso-service.js";

const permisoService = new PermisoService();

export const obtenerPermisos = async (req, res) => {
  try {
    const permisos = await permisoService.obtenerTodosLosPermisos();
    res.json({ exito: true, permisos });
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    res.status(500).json({ exito: false, mensaje: "Error al obtener permisos" });
  }
};

export const obtenerPorUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const permisos = await permisoService.obtenerPorUsuario(id);
    res.json({ exito: true, permisos });
  } catch (error) {
    console.error("Error al obtener permisos del usuario:", error);
    res.status(500).json({ exito: false, mensaje: "Error al obtener permisos del usuario" });
  }
};

export const crearPermiso = async (req, res) => {
  const { id, recurso, accion } = req.body;

  try {
    // Verificar si el permiso ya existe
    const permisosExistentes = await permisoService.obtenerPorUsuario(id);
    const permisoExistente = permisosExistentes.find(
      p => p.recurso === recurso && p.accion === accion
    );

    if (permisoExistente) {
      return res.status(400).json({
        exito: false,
        mensaje: "El permiso ya existe para este usuario"
      });
    }

    // Crear el permiso
    const nuevoPermiso = await permisoService.crearPermiso({
      id,
      recurso,
      accion,
      activo: true
    });

    res.status(201).json({
      exito: true,
      mensaje: "Permiso creado exitosamente",
      permiso: nuevoPermiso
    });
  } catch (error) {
    console.error("Error al crear permiso:", error);
    res.status(500).json({ exito: false, mensaje: "Error al crear permiso", error: error.message });
  }
};

export const actualizarPermiso = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const permisoActualizado = await permisoService.actualizarPermiso(id, { activo });

    if (!permisoActualizado) {
      return res.status(404).json({ exito: false, mensaje: "Permiso no encontrado" });
    }

    res.json({
      exito: true,
      mensaje: "Permiso actualizado exitosamente",
      permiso: permisoActualizado
    });
  } catch (error) {
    console.error("Error al actualizar permiso:", error);
    res.status(500).json({ exito: false, mensaje: "Error al actualizar permiso" });
  }
};

export const eliminarPermiso = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await permisoService.eliminarPermiso(id);

    if (!resultado) {
      return res.status(404).json({ exito: false, mensaje: "Permiso no encontrado" });
    }

    res.json({ exito: true, mensaje: "Permiso eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar permiso:", error);
    res.status(500).json({ exito: false, mensaje: "Error al eliminar permiso" });
  }

};

export const obtenerPermisoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const permiso = await permisoService.obtenerPermisoPorId(id);

    if (!permiso) {
      return res.status(404).json({ exito: false, mensaje: "Permiso no encontrado" });
    }

    res.json({ exito: true, permiso });
  } catch (error) {
    console.error("Error al obtener permiso:", error);
    res.status(500).json({ exito: false, mensaje: "Error al obtener permiso" });
  }
};

