// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PaginaPrincipal from '../src/vistas/PaginaPrincipal';

describe('PaginaPrincipal', () => {
  it('muestra la pantalla inicial antes de buscar', () => {
    render(<PaginaPrincipal />);
    expect(screen.getByText(/Bienvenido a WeatherNow/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre de la ciudad/i)).toBeInTheDocument();
  });
});
