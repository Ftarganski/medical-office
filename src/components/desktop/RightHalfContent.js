import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

const RightHalfContent = ({ selectedDate, appointmentsData }) => {
    const [doctorStats, setDoctorStats] = useState([]);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

    useEffect(() => {
        // Filter appointments for the selected date
        const filteredAppointments = appointmentsData.filter(appointment => appointment.date === selectedDate.toISOString().split('T')[0]);


        // Calculate doctor statistics for the selected date
        const doctorAppointments = {};
        filteredAppointments.forEach(appointment => {
            if (doctorAppointments[appointment.doctor]) {
                doctorAppointments[appointment.doctor]++;
            } else {
                doctorAppointments[appointment.doctor] = 1;
            }
        });

        const sortedDoctors = Object.keys(doctorAppointments).sort(
            (a, b) => doctorAppointments[b] - doctorAppointments[a]
        );

        setDoctorStats(sortedDoctors.map(doctor => ({
            name: doctor,
            appointments: doctorAppointments[doctor]
        })));
    }, [selectedDate, appointmentsData]);

    useEffect(() => {
        // Cycle through doctors every 3 seconds
        const interval = setInterval(() => {
            setCurrentDoctorIndex((currentDoctorIndex + 1) % doctorStats.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentDoctorIndex, doctorStats]);

    const maxAppointments = 16;
    const occupiedSlots = doctorStats.reduce((sum, doctor) => sum + doctor.appointments, 0);
    const occupancyPercentage = (occupiedSlots / maxAppointments) * 100;
    const currentDoctor = doctorStats[currentDoctorIndex];

    return (
        <Col md={11}>
            <Row className="box mb-3 p-3 rounded bg-primary text-center">
                <h4 className="text-white">Lotação Diária</h4>
                <h3 className="text-white">{occupancyPercentage.toFixed(2)}%</h3>
            </Row>
            <Row className="box p-3 rounded bg-secondary text-center">
                <h4 className="text-white">Agendamentos</h4>
                {currentDoctor ? (
                    <h3 className="text-white">
                        <strong>{currentDoctor.name}</strong><br />
                        {currentDoctor.appointments} consultas
                    </h3>
                ) : (
                    <h3 className="text-white">
                        Não há agendamentos
                    </h3>
                )}
            </Row>
        </Col>
    );
    
};

export default RightHalfContent;
