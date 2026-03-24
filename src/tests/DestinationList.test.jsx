import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { DestinationProvider } from "../contexts/DestinationContext";
import { DestinationList } from "../components/DestinationList/DestinationList.tsx";

// Mock del provider para usar datos fijos
const MockProvider = ({ children }) => (
    <MemoryRouter>
        <DestinationProvider>
            {children}
        </DestinationProvider>
    </MemoryRouter>
);

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, city: "Tokyo", budget: 2000 },
                { id: 2, city: "Paris", budget: 1500 }
            ])
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("DestinationList Component", () => {

    test("renderiza la lista vacía inicialmente (espera imagen de error)", () => {
        render(
            <MockProvider>
                <DestinationList />
            </MockProvider>
        );

        // Por defecto, sin datos, debería mostrar la imagen de error
        expect(screen.getByAltText(/No hay destinos/i)).toBeInTheDocument();
    });

});