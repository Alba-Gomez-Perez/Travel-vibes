import { Destination } from "../types/Destination";

export enum BudgetType {
    BUDGET = "Budget",
    PREMIUM_ECONOMY = "Premium Economy",
    LUXURY = "Luxury"
}

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
