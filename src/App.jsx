import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import DestinationList from './components/DestinationList.tsx';
import DestinationDetail from './components/DestinationDetail.tsx';
import { DestinationProvider } from './contexts/DestinationContext.tsx';
import Hero from './components/Hero.tsx';

function Layout() {
    const location = useLocation();

    return (
        <div className="travel-mood-container">
            <DestinationProvider>
                <div className="main-container">
                    {location.pathname === "/" && <Hero />}

                    <main>
                        <Routes>
                            <Route path="/" element={<DestinationList />} />
                            <Route path="/destination/:id" element={<DestinationDetail />} />
                        </Routes>
                    </main>
                </div>
            </DestinationProvider>

            <footer>
                <p>&copy; 2026 Travel-mood</p>
            </footer>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
