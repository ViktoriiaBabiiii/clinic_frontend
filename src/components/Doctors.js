import React, { useEffect, useState } from 'react';
import PageComponent from './PageComponent';
import './Doctors.css';  // Ensure the CSS styles are properly imported

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/doctors/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log to inspect the structure
                if (Array.isArray(data)) {
                    setDoctors(data);
                    setFilteredDoctors(data);
                } else if (data.doctors && Array.isArray(data.doctors)) {
                    setDoctors(data.doctors);
                    setFilteredDoctors(data.doctors);
                } else {
                    throw new Error('Data is not in expected format');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const filtered = doctors.filter(doctor => doctor.specialization.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredDoctors(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <PageComponent title="Наші Лікарі">
            <input
                type="text"
                placeholder="Search by specialization..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="doctor-list">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                        <h3>{doctor.first_name} {doctor.last_name}</h3>
                        <p>Спеціалізація: {doctor.specialization}</p>
                    </div>
                ))}
            </div>
        </PageComponent>
    );
}

export default Doctors;
