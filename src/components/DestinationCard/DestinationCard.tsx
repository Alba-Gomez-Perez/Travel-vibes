import { FC, useState } from 'react'
import { Heart } from 'lucide-react';
import type { Destination } from '../../types/Destination';
import { handleBudgetLog } from '../../services/Destination.service';
type Prop = {
    destination: Destination;
    onClick: (id: number) => void;
}
export const DestinationCard: FC<Prop> = ({ destination, onClick }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(() => {
        const saved = localStorage.getItem("favoritesDestinations");
        if (saved) {
            const favs: number[] = JSON.parse(saved);
            return favs.includes(destination.id);
        }
        return false;
    });

    const onMoreInfoClick = () => {
        onClick(destination.id);
    };

    function addFavorite(id: number) {
        const saved = localStorage.getItem("favoritesDestinations");
        let currentFavorites: number[] = saved ? JSON.parse(saved) : [];

        if (currentFavorites.includes(id)) {
            // Remove from favorites
            currentFavorites = currentFavorites.filter(favId => favId !== id);
            setIsFavorite(false);
        } else {
            // Add to favorites
            currentFavorites.push(id);
            setIsFavorite(true);
        }

        localStorage.setItem("favoritesDestinations", JSON.stringify(currentFavorites));
    }

    return (
        <div className="card">
            <div className="card-image-container">
                <div className="image-wrapper">
                    <img src={destination.image} alt={destination.city} className="card-image" />
                    <button
                        onClick={() => addFavorite(destination.id)}
                        className="heart-btn"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        style={{ color: isFavorite ? "#c35e2b" : "white" }}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <h3 className="city-name">{destination.city}</h3>
                </div>
            </div>
            <div className="card-content">
                <p className="destination-type">{handleBudgetLog(destination)}</p>
                <div className="card-details">
                    <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                        <span>From {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(destination.budget * 1000)}</span>
                    </div>
                    <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H3l-1 1 3 2 2 3 1-1v-4l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"></path></svg>
                        <span>{destination.airportCode}</span>
                    </div>
                </div>
                <div className="card-footer">
                    <button onClick={onMoreInfoClick} className="search-btn">More info</button>
                </div>
            </div>
        </div>
    );
}
