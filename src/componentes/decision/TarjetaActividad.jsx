import { ETIQUETAS_NIVEL, NIVELES } from '../../dominio/decision/actividades';
import { formatearHora } from '../../utilidades/formateadores';

const ESTILOS_NIVEL = {
  [NIVELES.FAVORABLE]: {
    contenedor: 'border-green-300 bg-green-50',
    texto: 'text-green-700',
    simbolo: '✔'
  },
  [NIVELES.PRECAUCION]: {
    contenedor: 'border-amber-300 bg-amber-50',
    texto: 'text-amber-700',
    simbolo: '!'
  },
  [NIVELES.NO_RECOMENDADO]: {
    contenedor: 'border-red-300 bg-red-50',
    texto: 'text-red-700',
    simbolo: '✕'
  }
};

// Tarjeta de veredicto para una actividad. El nivel no depende solo del color:
// incluye etiqueta de texto y símbolo.
const TarjetaActividad = ({ resultado, mejorFranja }) => {
  const estilo = ESTILOS_NIVEL[resultado.nivel] || ESTILOS_NIVEL[NIVELES.PRECAUCION];

  return (
    <div className={`rounded-lg border p-4 ${estilo.contenedor}`}>
      <div className="flex items-center justify-between">
        <span className="text-3xl" aria-hidden="true">
          {resultado.icono}
        </span>
        <span className={`text-sm font-bold ${estilo.texto}`}>
          <span aria-hidden="true">{estilo.simbolo} </span>
          {ETIQUETAS_NIVEL[resultado.nivel]}
        </span>
      </div>
      <h4 className="mt-2 font-bold text-gray-800">{resultado.nombre}</h4>
      <p className="text-sm text-gray-600">{resultado.motivo}</p>
      {mejorFranja && (
        <p className="mt-2 text-xs text-gray-500">
          Mejor franja: {formatearHora(mejorFranja.franja.fecha, mejorFranja.franja.zonaHoraria)}
        </p>
      )}
      {resultado.datosAusentes.length > 0 && (
        <p className="mt-1 text-xs text-gray-400">
          Sin datos de {resultado.datosAusentes.join(', ')}
        </p>
      )}
    </div>
  );
};

export default TarjetaActividad;
