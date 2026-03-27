import { handleBudgetLog, getAllDestinations } from "../services/Destination.service";
import { BudgetType } from "../types/Budget";

global.fetch = jest.fn();

describe("handleBudgetLog", () => {
    it("return BUDGET if between 500 and 1299", () => {
        const destination = { budget: 1 } as any;

        const result = handleBudgetLog(destination);

        expect(result).toBe(BudgetType.BUDGET);
    });

    it("return PREMIUM_ECONOMY if between 1300 and 1699", () => {
        const destination = { budget: 1.5 } as any;

        const result = handleBudgetLog(destination);

        expect(result).toBe(BudgetType.PREMIUM_ECONOMY);
    });

    it("return LUXURY if >= 1700", () => {
        const destination = { budget: 2 } as any;

        const result = handleBudgetLog(destination);

        expect(result).toBe(BudgetType.LUXURY);
    });
});

describe("getAllDestinations", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("return data correctly", async () => {
        const mockData = [{ city: "Tokyo" }];

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const data = await getAllDestinations();

        expect(fetch).toHaveBeenCalledWith("/destinations.json");
        expect(data).toEqual(mockData);
        expect(data).toHaveLength(1);
    });

    it("throw error if fetch fails", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async () => ({ data: 'test' }),
        });

        await expect(getAllDestinations()).rejects.toThrow(
            "Error al cargar destinations.json"
        );
    });
});