// Límite de peticiones por cliente en una ventana temporal.
export const crearLimitador = ({
  maximo = 60,
  ventanaMs = 10 * 60 * 1000,
  ahora = () => Date.now()
} = {}) => {
  const clientes = new Map();

  const permitir = (clienteId) => {
    const momento = ahora();
    const ventana = clientes.get(clienteId);

    if (!ventana || ventana.reiniciaEn <= momento) {
      const reiniciaEn = momento + ventanaMs;
      clientes.set(clienteId, { cuenta: 1, reiniciaEn });
      return { permitido: true, restantes: maximo - 1, reiniciaEn };
    }

    if (ventana.cuenta >= maximo) {
      return { permitido: false, restantes: 0, reiniciaEn: ventana.reiniciaEn };
    }

    ventana.cuenta += 1;
    return { permitido: true, restantes: maximo - ventana.cuenta, reiniciaEn: ventana.reiniciaEn };
  };

  return { permitir };
};
