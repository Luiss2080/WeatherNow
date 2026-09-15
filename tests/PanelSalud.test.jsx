// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PanelSalud from '../src/componentes/salud/PanelSalud';

describe('PanelSalud', () => {
  it('muestra UV, calidad del aire y polen', () => {
    render(<PanelSalud aire={{ uv: 8, indiceAire: 120, polen: { abedul: 4 } }} />);

    expect(screen.getByText(/Índice UV/i)).toBeInTheDocument();
    expect(screen.getByText(/protección/i)).toBeInTheDocument();
    expect(screen.getByText(/dañina para grupos sensibles/i)).toBeInTheDocument();
    expect(screen.getByText(/limitar el esfuerzo/i)).toBeInTheDocument();
    expect(screen.getByText(/niveles altos de polen/i)).toBeInTheDocument();
  });

  it('avisa cuando faltan datos', () => {
    render(<PanelSalud aire={{ uv: null, indiceAire: null, polen: {} }} />);
    expect(screen.getByText(/sin datos de uv/i)).toBeInTheDocument();
    expect(screen.getByText(/sin datos de calidad del aire/i)).toBeInTheDocument();
  });

  it('no renderiza nada sin datos de aire', () => {
    const { container } = render(<PanelSalud aire={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
