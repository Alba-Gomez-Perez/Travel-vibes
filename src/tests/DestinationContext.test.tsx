import { render, screen } from "@testing-library/react";
import { DestinationProvider, useDestinationContext } from "../contexts/DestinationContext";
import { getAllDestinations } from "../services/Destination.service";

jest.mock("../services/Destination.service", () => ({
    getAllDestinations: jest.fn(),
}));

let mockGetAllDestinations: jest.Mock;

const TestComponent = () => {
    const { filteredDestinations, loading, error, searchDestinations } = useDestinationContext();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message || "Error"}</div>;

    return (
        <div>
            <ul>
                {filteredDestinations.map((d: any, i: number) => (
                    <li key={i}>{d.city}</li>
                ))}
            </ul>
            <button onClick={() => searchDestinations("Tokyo")}>Search Tokyo</button>
        </div>
    );
};

describe("DestinationContext", () => {
    beforeEach(() => {
        mockGetAllDestinations = getAllDestinations as jest.Mock;
        mockGetAllDestinations.mockClear();
    });

    test("loads data and provides it to children", async () => {
        mockGetAllDestinations.mockResolvedValue([
            { city: "Tokyo", budget: 1 },
            { city: "Paris", budget: 2 },
        ]);

        render(
            <DestinationProvider>
                <TestComponent />
            </DestinationProvider>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        const tokyo = await screen.findByText("Tokyo");
        const paris = await screen.findByText("Paris");

        expect(tokyo).toBeInTheDocument();
        expect(paris).toBeInTheDocument();
    });

    test("handles errors when loading data", async () => {
        mockGetAllDestinations.mockRejectedValue(new Error("Fetch error"));

        render(
            <DestinationProvider>
                <TestComponent />
            </DestinationProvider>
        );

        const errorMsg = await screen.findByText("Fetch error");
        expect(errorMsg).toBeInTheDocument();
    });
});