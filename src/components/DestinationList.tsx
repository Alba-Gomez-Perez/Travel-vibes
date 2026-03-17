import { useNavigate } from "react-router-dom";
import { Destination } from "../types/Destination";
import DestinationCard from './DestinationCard';
import { useDestinations } from "../contexts/DestinationContext";
import errorImage from "../assets/error.png";


export const DestinationList = () => {
    const { filteredDestinations } = useDestinations();
    const navigate = useNavigate();

    return (
        <div className="destinations-container">
            {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination: Destination) => (
                    <DestinationCard
                        key={destination.id}
                        destination={destination}
                        onClick={() => navigate(`/destination/${destination.id}`)}
                    />
                ))
            ) : (
                <div className="no-results">
                    <img
                        src={errorImage}
                        alt="No hay destinos"
                        className="error-image"
                    />
                </div>
            )}
        </div>
    );
};

export default DestinationList;
