import { useState } from 'react';
import Tarjeta from '../comunes/Tarjeta';
import { TIPOS_ALERTA } from '../../dominio/alertas/condiciones';

const ListaTipos = Object.values(TIPOS_ALERTA);

// Panel para crear y gestionar alertas del lugar actual (spec 002, RF-12).
const PanelAlertas = ({ lugar, alertas, disparadas = [], limite, onAgregar, onEliminar, onAlternar }) => {
  const [condicion, setCondicion] = useState(ListaTipos[0].id);
  const [umbral, setUmbral] = useState(ListaTipos[0].umbralPorDefecto);
  const [mensaje, setMensaje] = useState('');

  const tipo = TIPOS_ALERTA[condicion];
  const alLimite = alertas.length >= limite;

  const cambiarCondicion = (nuevaCondicion) => {
    setCondicion(nuevaCondicion);
    setUmbral(TIPOS_ALERTA[nuevaCondicion].umbralPorDefecto);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!lugar) return;

    const resultado = onAgregar({
      lugarId: lugar.id,
      lugarNombre: lugar.nombre,
      condicion,
      umbral: Number(umbral)
    });

    if (resultado?.motivo === 'limite') setMensaje('Alcanzaste el límite de alertas de tu plan.');
    else if (resultado?.motivo === 'duplicada') setMensaje('Ya existe una alerta de ese tipo.');
    else setMensaje('');
  };

  return (
    <Tarjeta titulo="🔔 Alertas">
      <p className="mb-4 text-sm text-gray-600">
        Aviso dentro de la app cuando se cumpla una condición en el pronóstico.
      </p>

      {!lugar ? (
        <p className="text-sm text-gray-500">Busca un lugar para crear alertas.</p>
      ) : (
        <form onSubmit={manejarEnvio} className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-sm text-gray-700">
            <span className="mb-1 font-medium">Condición</span>
            <select
              value={condicion}
              onChange={(evento) => cambiarCondicion(evento.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ListaTipos.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm text-gray-700">
            <span className="mb-1 font-medium">Umbral ({tipo.unidad})</span>
            <input
              type="number"
              value={umbral}
              min={tipo.minimo}
              max={tipo.maximo}
              onChange={(evento) => setUmbral(evento.target.value)}
              className="w-28 rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            disabled={alLimite}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Crear alerta
          </button>

          {alLimite && (
            <span className="text-sm text-amber-700">Límite de tu plan alcanzado.</span>
          )}
        </form>
      )}

      {mensaje && (
        <p className="mt-2 text-sm text-amber-700" role="status">
          {mensaje}
        </p>
      )}

      {disparadas.length > 0 && (
        <div className="mt-4 space-y-2" role="alert">
          {disparadas.map(({ alerta }) => (
            <p key={alerta.id} className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
              ⚠️ {alerta.lugarNombre || 'Tu lugar'}:{' '}
              {TIPOS_ALERTA[alerta.condicion].descripcion(alerta.umbral)}
            </p>
          ))}
        </div>
      )}

      {alertas.length > 0 && (
        <ul className="mt-4 space-y-2">
          {alertas.map((alerta) => (
            <li
              key={alerta.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            >
              <span className="text-gray-700">
                {alerta.lugarNombre || 'Lugar'} · {TIPOS_ALERTA[alerta.condicion].descripcion(alerta.umbral)}
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onAlternar(alerta.id)}
                  aria-pressed={alerta.activa}
                  className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
                >
                  {alerta.activa ? 'Activa' : 'Pausada'}
                </button>
                <button
                  type="button"
                  onClick={() => onEliminar(alerta.id)}
                  aria-label={`Eliminar alerta ${TIPOS_ALERTA[alerta.condicion].nombre}`}
                  className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  );
};

export default PanelAlertas;
