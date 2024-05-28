import React, { useState, useEffect } from 'react';
import PageComponent from './PageComponent';
import './Services.css';

function Services() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/services/');
                const data = await response.json();
                setServices(data.services || []); // Ensure data.services exists or default to empty array
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PageComponent title="Послуги">
            <div className="service-list-container">
                <h1>Наші послуги</h1>
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="services-grid">
                    {filteredServices.map(service => (
                        <div key={service.id} className="service-item">
                            <h3>{service.name}</h3>
                            <p className="service-price">${Number(service.price).toFixed(2)}</p>
                            <p>{service.description || 'No description available.'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageComponent>
    );
}

export default Services;

