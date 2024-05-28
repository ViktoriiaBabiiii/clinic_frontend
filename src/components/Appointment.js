import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageComponent from './PageComponent';
import './Appointment.css'; // Ensure this file exists or create it

function BookAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patient_first_name: '',
        patient_last_name: '',
        patient_email: '',
        doctor: '',
        appointment_date: '',
        comments: ''
    });
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/doctors/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDoctors(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setAppointmentDetails({
            ...appointmentDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const appointmentDate = new Date(appointmentDetails.appointment_date);
        const hours = appointmentDate.getHours();

        if (hours < 8 || hours > 18) {
            alert('Appointments can only be booked between 08:00 and 18:00.');
            return;
        }

        fetch('http://127.0.0.1:8000/api/appointments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Appointment booked successfully!');
            navigate('/'); // Redirect to homepage
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
            alert('Error booking appointment. Please try again.');
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <PageComponent title="Запис на прийом">
            <form className="appointment-form" onSubmit={handleSubmit}>
                <label>
                    Ім'я:
                    <input
                        type="text"
                        name="patient_first_name"
                        value={appointmentDetails.patient_first_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Прізвище:
                    <input
                        type="text"
                        name="patient_last_name"
                        value={appointmentDetails.patient_last_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="patient_email"
                        value={appointmentDetails.patient_email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Лікар:
                    <select
                        name="doctor"
                        value={appointmentDetails.doctor}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Виберіть лікаря</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Дата прийому:
                    <input
                        type="datetime-local"
                        name="appointment_date"
                        value={appointmentDetails.appointment_date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Коментарі:
                    <textarea
                        name="comments"
                        value={appointmentDetails.comments}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Записатися</button>
            </form>
        </PageComponent>
    );
}

export default BookAppointment;
