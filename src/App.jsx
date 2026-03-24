import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import './App.css'
import { DestinationList } from './components/DestinationList/DestinationList.tsx';
import { DestinationDetail } from './components/DestinationDetail/DestinationDetail.tsx';
import { DestinationProvider } from './contexts/DestinationContext';
import { Header } from './components/Header/Header.tsx';

function Layout() {
    const location = useLocation();

    return (
        <div className="travel-mood-container">
            <DestinationProvider>
                <div className="main-container">
                    {location.pathname === "/" && <Header />}

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

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
