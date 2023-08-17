import React from 'react';
import { FaPhone } from 'react-icons/fa'

const AppointmentList = ({ appointmentsData, patientData, doctorsData, selectedDate }) => {
    const groupedAppointments = appointmentsData.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(appointment);
        return acc;
    }, {});

    const appointmentsForSelectedDate = groupedAppointments[selectedDate.toISOString().split('T')[0]] || [];

    return (
        <div className="appointments p-3 d-flex flex-column justify-content-center align-items-center w-100">
            <h4 className="mb-4">Consultas Agendadas</h4>
            <ul className="list-group w-100">
                {appointmentsForSelectedDate.length > 0 ? (
                    appointmentsForSelectedDate.map((appointment, index) => {
                        const patient = patientData[appointment.patientID];
                        const doctor = doctorsData[appointment.doctorID];

                        return (
                            <li key={index} className="list-group-item">
                                <div>
                                    <strong>Paciente:</strong> {patient?.patientName}<br />
                                    <strong>Fone:</strong> {patient?.patientPhone} <a href={`tel:${patient?.patientPhone}`}>
                                        <FaPhone />
                                    </a> <br />
                                    <strong>Médico:</strong> {doctor?.doctorName}<br />
                                    <strong>Horário:</strong> {appointment.time}
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <li className="list-group-item">
                        <div className="d-flex align-items-center justify-content-center w-100">
                            <span><strong>Sem agendamentos para a data selecionada</strong></span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default AppointmentList;
