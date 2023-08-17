import React from 'react';

const AppointmentList = ({ filteredAppointments, patientData, doctorsData }) => {
    return (
        <div className="appointments p-3 d-flex flex-column justify-content-center align-items-center w-100">
            <h4 className="mb-4">Consultas Agendadas</h4>
            <ul className="list-group w-100">
                {filteredAppointments.map((appointment, index) => {
                    const patient = patientData[appointment.patientID];
                    const doctor = doctorsData[appointment.doctorID];

                    return (
                        <li key={index} className="list-group-item">
                            <div>
                                <strong>Paciente:</strong> {patient?.patientName}<br />
                                <strong>Fone:</strong> {patient?.patientPhone} <br />
                                <strong>Médico:</strong> {doctor?.doctorName}<br />
                                <strong>Horário:</strong> {appointment.time}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AppointmentList;
