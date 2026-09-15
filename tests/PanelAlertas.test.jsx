// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PanelAlertas from '../src/componentes/alertas/PanelAlertas';

const lugar = { id: '40.417,-3.704', nombre: 'Madrid', pais: 'ES', lat: 40.417, lon: -3.704 };

describe('PanelAlertas', () => {
  it('pide buscar un lugar cuando no hay ninguno', () => {
    render(
      <PanelAlertas
        lugar={null}
        alertas={[]}
        limite={1}
        onAgregar={vi.fn()}
        onEliminar={vi.fn()}
        onAlternar={vi.fn()}
      />
    );
    expect(screen.getByText(/busca un lugar para crear alertas/i)).toBeInTheDocument();
  });

  it('crea una alerta con la condición y el umbral elegidos', () => {
    const onAgregar = vi.fn().mockReturnValue({ agregada: true });
    render(
      <PanelAlertas
        lugar={lugar}
        alertas={[]}
        limite={1}
        onAgregar={onAgregar}
        onEliminar={vi.fn()}
        onAlternar={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /crear alerta/i }));

    expect(onAgregar).toHaveBeenCalledWith({
      lugarId: lugar.id,
      lugarNombre: 'Madrid',
      condicion: 'lluvia',
      umbral: 50
    });
  });

  it('deshabilita el alta al alcanzar el límite del plan', () => {
    render(
      <PanelAlertas
        lugar={lugar}
        alertas={[{ id: 'a', lugarId: lugar.id, condicion: 'lluvia', umbral: 50, activa: true }]}
        limite={1}
        onAgregar={vi.fn()}
        onEliminar={vi.fn()}
        onAlternar={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /crear alerta/i })).toBeDisabled();
  });

  it('muestra las alertas disparadas', () => {
    render(
      <PanelAlertas
        lugar={lugar}
        alertas={[]}
        limite={1}
        disparadas={[
          {
            alerta: {
              id: 'a',
              lugarId: lugar.id,
              lugarNombre: 'Madrid',
              condicion: 'lluvia',
              umbral: 50,
              activa: true
            },
            resultado: { cumplida: true }
          }
        ]}
        onAgregar={vi.fn()}
        onEliminar={vi.fn()}
        onAlternar={vi.fn()}
      />
    );
    expect(screen.getByText(/lluvia probable/i)).toBeInTheDocument();
  });
});
