import './Header.css';
import { Search } from 'lucide-react';
import { useDestinationContext } from '../../contexts/DestinationContext';

export const Header = () => {
    const { searchDestinations } = useDestinationContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        searchDestinations(value);
    };

    return (
        <section className="hero-section">
            <div className="hero-overlay"></div>
            <nav className="hero-navbar">
                <div className="nav-left">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search destination..." className="nav-search-input" onChange={handleChange} />
                    </div>
                </div>
                <div className="nav-center">
                    <span className="logo-text">Travels</span>
                </div>
                <div className="nav-right"></div>
            </nav>
        </section>
    );
};

