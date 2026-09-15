// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PanelDecisiones from '../src/componentes/decision/PanelDecisiones';

describe('PanelDecisiones', () => {
  it('muestra una tarjeta por actividad con su veredicto', () => {
    render(
      <PanelDecisiones
        condiciones={{
          temperatura: 18,
          sensacionTermica: 18,
          velocidadViento: 8,
          probabilidadLluvia: 5
        }}
      />
    );

    expect(screen.getByText('Correr')).toBeInTheDocument();
    expect(screen.getByText('Ciclismo')).toBeInTheDocument();
    expect(screen.getByText('Tender la ropa')).toBeInTheDocument();
    expect(screen.getAllByText(/Favorable/).length).toBeGreaterThan(0);
  });

  it('no renderiza nada sin condiciones', () => {
    const { container } = render(<PanelDecisiones condiciones={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
