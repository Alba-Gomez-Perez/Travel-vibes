import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { DestinationProvider } from "../contexts/DestinationContext.tsx";
import { DestinationList } from "../components/DestinationList/DestinationList.tsx";

// Mock del provider para usar datos fijos
const MockProvider = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        <DestinationProvider>
            {children}
        </DestinationProvider>
    </MemoryRouter>
);

const unmockedFetch = global.fetch;

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, city: "Tokyo", country: "Japan", timezone: "JST", budget: 2000, best_time_to_visit: "Spring", imageUrl: "", rating: 4.8 },
                { id: 2, city: "Paris", country: "France", timezone: "CET", budget: 1500, best_time_to_visit: "Summer", imageUrl: "", rating: 4.7 }
            ])
        })
    ) as jest.Mock;
});

afterEach(() => {
    global.fetch = unmockedFetch;
    jest.restoreAllMocks();
});

describe("DestinationList Component", () => {

    test("Render empty list", async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([])
            })
        );
        render(
            <MockProvider>
                <DestinationList />
            </MockProvider>
        );

        // Por defecto, sin datos, debería mostrar la imagen de error
        expect(await screen.findByAltText(/No hay destinos/i)).toBeInTheDocument();
    });

    test("Render destinations lists with data", async () => {
        render(
            <MockProvider>
                <DestinationList />
            </MockProvider>
        );

        // Esperar a que los elementos con los nombres de las ciudades aparezcan
        const tokyoElement = await screen.findByText(/Tokyo/i);
        const parisElement = await screen.findByText(/Paris/i);

        expect(tokyoElement).toBeInTheDocument();
        expect(parisElement).toBeInTheDocument();

        // Validar que se muestran exactamente dos componentes DestinationCard
        const moreInfoButtons = await screen.findAllByRole('button', { name: /More info/i });
        expect(moreInfoButtons).toHaveLength(2);
    });

    test("Render destination card twice", async () => {
        render(
            <MockProvider>
                <DestinationList />
            </MockProvider>
        );

        const tokyoElement = await screen.findByText(/Tokyo/i);
        const parisElement = await screen.findByText(/Paris/i);

        const moreInfoButtons = await screen.findAllByRole('button', { name: /More info/i });
        expect(moreInfoButtons).toHaveLength(2);
    });

});