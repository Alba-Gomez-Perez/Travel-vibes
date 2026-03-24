import { Destination } from "../types/Destination";
import { BudgetType } from "../types/Budget";


export const handleBudgetLog = (destination: Destination) => {
    const budget = destination.budget * 1000;

    if (budget >= 500 && budget < 1300) {
        return BudgetType.BUDGET;
    }

    if (budget >= 1300 && budget < 1700) {
        return BudgetType.PREMIUM_ECONOMY;
    }

    return BudgetType.LUXURY;
};

export async function getAllDestinations() {
    const res = await fetch("/destinations.json");
    if (!res.ok) {
        throw new Error("Error al cargar destinations.json");
    }

    return await res.json();
}
