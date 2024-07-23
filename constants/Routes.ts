export const rutinaRoutes = {
    agregarRutinaCabecera: (rutina = "[rutina]") => `rutinas/AgregarRutinaCabeceraScreen/${rutina}`,
    agregarRutina: "rutinas/CrearRutinaScreen",
    editarRutina: (rutina = "[rutina]") => `rutinas/EditarRutinaScreen/${rutina}`,
    rutinaHome: "RutinaHomeScreen",
}

export const agendaPesoHome = "AgendaPesoHomeScreen"