import { createContext, useContext, useEffect, useState } from "react";
import { Destination } from "../types/Destination";

const DestinationContext = createContext<any | undefined>(undefined);

export function DestinationProvider({ children }: { children: React.ReactNode }) {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/destinations.json")
            .then((res) => res.json())
            .then((data) => {
                setDestinations(data);
                setFilteredDestinations(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error cargando JSON:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const searchDestinations = (query: string) => {
        const filtered = destinations.filter((destination) =>
            destination.city.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredDestinations(filtered);
    };

    return (
        <DestinationContext.Provider
            value={{
                filteredDestinations,
                selectedDestination,
                setSelectedDestination,
                searchDestinations,
                loading,
                error,
            }}
        >
            {children}
        </DestinationContext.Provider>
    );
}

export function useDestinations() {
    return useContext(DestinationContext);
}