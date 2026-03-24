import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDestinationContext } from "../../contexts/DestinationContext";
import "./DestinationDetail.css";
import type { Destination } from "../../types/Destination";

export const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { filteredDestinations } = useDestinationContext();

    const destination = filteredDestinations.find((destination: Destination) => destination.id === Number(id));

    if (!destination) {
        return (
            <div className="destinations-container">
                <div className="detail-view">
                    <p>Destination not found.</p>
                    <button className="icon-btn" onClick={() => navigate("/")}>
                        <ArrowLeft size={24} /> Back to list
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="destinations-container destinations-container-detail">
            <div className="detail-view">
                <div className="top-bar">
                    <button className="icon-btn" onClick={() => navigate("/")} aria-label="Go back">
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="info-section">
                    <h1 className="detail-title">{destination.city}</h1>
                    <h2 className="detail-subtitle">{destination.continent}</h2>
                    <p className="detail-desc">{destination.description}</p>

                    {destination.tags && destination.tags.length > 0 && (
                        <div className="detail-tags">
                            {destination.tags.map((tag: string, index: number) => (
                                <span key={index} className="tag-item">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="hero-image-section">
                    <img src={destination.image} alt={destination.city} className="hero-main-image" />

                    <button className="back-overlay-btn" onClick={() => navigate("/")}>
                        <ArrowLeft size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};