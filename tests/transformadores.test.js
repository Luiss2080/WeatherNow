import { describe, it, expect } from 'vitest';
import {
  transformarDatosClima,
  transformarDatosPronostico,
  agruparPronosticoPorDias
} from '../src/utilidades/transformadores';

describe('transformarDatosClima', () => {
  it('normaliza la respuesta y expone la zona horaria', () => {
    const resultado = transformarDatosClima({
      name: 'Madrid',
      timezone: 7200,
      sys: { country: 'ES', sunrise: 100, sunset: 200 },
      main: { temp: 20, feels_like: 19, temp_min: 15, temp_max: 25, humidity: 50, pressure: 1010 },
      wind: { speed: 3 },
      weather: [{ description: 'despejado', icon: '01d' }],
      coord: { lat: 40.4, lon: -3.7 }
    });

    expect(resultado.ciudad).toBe('Madrid');
    expect(resultado.zonaHoraria).toBe(7200);
    expect(resultado.temperatura).toBe(20);
    expect(resultado.icono).toBe('01d');
  });

  it('tolera campos ausentes sin lanzar', () => {
    const resultado = transformarDatosClima({});
    expect(resultado.pais).toBe('');
    expect(resultado.zonaHoraria).toBe(0);
    expect(resultado.coordenadas).toEqual({ latitud: 0, longitud: 0 });
  });
});

describe('transformarDatosPronostico y agruparPronosticoPorDias', () => {
  const zonaHoraria = 3600;
  const respuesta = {
    city: { timezone: zonaHoraria },
    list: [
      {
        dt: 1600036200,
        main: { temp: 10, temp_min: 8, temp_max: 12, humidity: 60 },
        weather: [{ icon: '01d', description: 'a' }],
        wind: { speed: 1 },
        pop: 0.2
      },
      {
        dt: 1600039800,
        main: { temp: 11, temp_min: 9, temp_max: 13, humidity: 62 },
        weather: [{ icon: '01d', description: 'b' }],
        wind: { speed: 2 },
        pop: 0.3
      },
      {
        dt: 1600043400,
        main: { temp: 12, temp_min: 10, temp_max: 14, humidity: 64 },
        weather: [{ icon: '01d', description: 'c' }],
        wind: { speed: 3 },
        pop: 0.4
      }
    ]
  };

  it('propaga la zona horaria a cada franja', () => {
    const items = transformarDatosPronostico(respuesta);
    expect(items).toHaveLength(3);
    expect(items.every((i) => i.zonaHoraria === zonaHoraria)).toBe(true);
    expect(items[0].probabilidadLluvia).toBeCloseTo(20);
  });

  it('agrupa por día local usando el offset, no el del dispositivo', () => {
    const items = transformarDatosPronostico(respuesta);
    const dias = agruparPronosticoPorDias(items);

    expect(dias).toHaveLength(2);
    expect(dias[0].diaClave).toBe('2020-09-13');
    expect(dias[0].items).toHaveLength(1);
    expect(dias[0].temperaturaMin).toBe(8);
    expect(dias[0].temperaturaMax).toBe(12);

    expect(dias[1].diaClave).toBe('2020-09-14');
    expect(dias[1].items).toHaveLength(2);
    expect(dias[1].temperaturaMin).toBe(9);
    expect(dias[1].temperaturaMax).toBe(14);
    expect(dias[1].humedadPromedio).toBeCloseTo(63);
  });
});
