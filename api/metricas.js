// Contadores de uso del proxy por tipo de dato (spec 002, TF3).
export const crearMetricas = ({ ahora = () => Date.now() } = {}) => {
  const iniciadoEn = ahora();
  const porTipo = new Map();

  const asegurar = (tipo, proveedor) => {
    if (!porTipo.has(tipo)) {
      porTipo.set(tipo, {
        tipo,
        proveedor: proveedor || 'desconocido',
        peticiones: 0,
        aciertosCache: 0,
        fallosCache: 0,
        errores: 0
      });
    }
    return porTipo.get(tipo);
  };

  const registrarPeticion = (tipo, proveedor) => {
    asegurar(tipo, proveedor).peticiones += 1;
  };
  const registrarAcierto = (tipo, proveedor) => {
    asegurar(tipo, proveedor).aciertosCache += 1;
  };
  const registrarFallo = (tipo, proveedor) => {
    asegurar(tipo, proveedor).fallosCache += 1;
  };
  const registrarError = (tipo, proveedor) => {
    asegurar(tipo, proveedor).errores += 1;
  };

  const resumen = () => ({ iniciadoEn, porTipo: Object.fromEntries(porTipo) });

  return { registrarPeticion, registrarAcierto, registrarFallo, registrarError, resumen };
};
