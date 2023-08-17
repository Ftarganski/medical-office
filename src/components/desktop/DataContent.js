import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import doctorsData from '../../database/doctors.json';

const DataContent = ({ selectedDate, appointmentsData }) => {
    const [doctorStats, setDoctorStats] = useState([]);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);


    useEffect(() => {
        // FILTRANDO PELA DATA SELECIONADA
        const filteredAppointments = appointmentsData.filter(appointment => appointment.date === selectedDate.toISOString().split('T')[0]);

        // CÁLCULO DAS ESTATÍSTICAS DO MÉDICO
        const doctorAppointments = {};
        filteredAppointments.forEach(appointment => {
            if (doctorAppointments[appointment.doctorID]) {
                doctorAppointments[appointment.doctorID]++;
            } else {
                doctorAppointments[appointment.doctorID] = 1;
            }
        });

        const sortedDoctors = Object.keys(doctorAppointments).sort(
            (a, b) => doctorAppointments[b] - doctorAppointments[a]
        );

        setDoctorStats(sortedDoctors.map(doctorID => ({
            doctorID,
            name: getDoctorName(doctorID),
            appointments: doctorAppointments[doctorID]
        })));
    }, [selectedDate, appointmentsData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDoctorIndex(prevIndex =>
                (prevIndex + 1) % doctorStats.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [doctorStats]);

    const maxAppointments = 8;
    const occupiedSlots = doctorStats.reduce((sum, doctor) => sum + doctor.appointments, 0);
    const occupancyPercentage = (occupiedSlots / maxAppointments) * 100;

    const getDoctorName = (doctorID) => {
        const doctor = doctorsData[doctorID];
        return doctor ? doctor.doctorName : "ERROR";
    };

    return (
        <Col md={10} className="d-flex flex-column">
            <Row className="h-50 box mb-3 p-3 rounded bg-primary text-center">
                <h4 className="text-white">Lotação Diária</h4>
                <h3 className="text-white">{occupancyPercentage.toFixed(2)}%</h3>
            </Row>
            <Row className="h-50 box mb-3 p-3 rounded bg-secondary text-center">
                
                    <h4 className="text-white">Médico</h4>
                    {doctorStats.length > 0 && (
                    <div className="">
                        <h3 className="text-white">
                            {getDoctorName(doctorStats[currentDoctorIndex].doctorID)}
                        </h3>
                        <h4 className="text-white">
                            Consultas: {doctorStats[currentDoctorIndex].appointments}
                        </h4>
                    </div>
                )}
                
            </Row>
        </Col>
    );
};

export default DataContent;
