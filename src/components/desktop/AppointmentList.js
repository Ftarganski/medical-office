import React from 'react';

const AppointmentList = ({ filteredAppointments, chunkArray, patientData, doctorsData }) => {
    return (
        <div className="appointments p-3 d-flex flex-column justify-content-center align-items-center w-100">
            <h4 className="mb-4">Consultas Agendadas</h4>
            <ul className="list-group w-100">
                {chunkArray(filteredAppointments, 2).map((appointmentsPair, index) => (
                    <li key={index} className="list-group-item d-flex">
                        {appointmentsPair.map((appointment, innerIndex) => {
                            const patient = patientData[appointment.patientID];
                            const doctor = doctorsData[appointment.doctorID];

                            return (
                                <div key={innerIndex} className="col-md-6">
                                    <strong>Paciente:</strong> {patient?.patientName}<br />
                                    <strong>Fone:</strong> {patient?.patientPhone} <br />
                                    <strong>Médico:</strong> {doctor?.doctorName}<br />
                                    <strong>Horário:</strong> {appointment.time}
                                </div>
                            );
                        })}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
