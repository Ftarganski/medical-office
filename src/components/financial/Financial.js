import React, { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

import './Financial.css';

import appointments from '../../database/appointment.json';
import doctors from '../../database/doctors.json';
import patients from '../../database/patient.json';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('pt-BR', options);
};

const Financial = () => {
  const [sortBy, setSortBy] = useState('date-asc');
  const [doctorFilter, setDoctorFilter] = useState('');

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const twoDaysLater = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const sortedAppointments = [...appointments]
    .filter((appointment) => appointment.date >= twoDaysAgo && appointment.date <= twoDaysLater)
    .sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'name-asc') {
        const patientA = patients[a.patientID]?.patientName || '';
        const patientB = patients[b.patientID]?.patientName || '';
        return patientA.localeCompare(patientB);
      } else if (sortBy === 'name-desc') {
        const patientA = patients[a.patientID]?.patientName || '';
        const patientB = patients[b.patientID]?.patientName || '';
        return patientB.localeCompare(patientA);
      }
      return 0;
    });

  const filteredAppointments = sortedAppointments.filter(
    (appointment) =>
      (!doctorFilter || (doctors[appointment.doctorID]?.doctorName || '').toLowerCase().includes(doctorFilter.toLowerCase()))
  );

  return (
    <div className="viewer-area p-0">
      <Container fluid className="h-100 p-0">
        <Row className="h-100">
          <Col md={12} className="h-100">
            <div className="right-column p-3 d-flex flex-column justify-content-center align-items-center">
              <Row className="w-100">
                <h2 className="mb-4">Controle Financeiro</h2>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                    </div>

                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por nome do médico"
                        value={doctorFilter}
                        onChange={(e) => setDoctorFilter(e.target.value)}
                      />
                    </div>

                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="date-asc">Ordenar por Data (Crescente)</option>
                        <option value="date-desc">Ordenar por Data (Decrescente)</option>
                        <option value="name-asc">Ordenar por Paciente (Crescente)</option>
                        <option value="name-desc">Ordenar por Paciente (Decrescente)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Row>

              <Table striped bordered className="mt-4">
                <thead>
                  <tr>
                    <th>Finalizada</th>
                    <th>Data da consulta</th>
                    <th>Nome Paciente</th>
                    <th>Telefone Paciente</th>
                    <th>Nome do Médico</th>
                    <th>Valor</th>
                    <th className="text-center">Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => {
                    const patient = patients[appointment.patientID];
                    const doctor = doctors[appointment.doctorID];
                    return (
                      <tr key={appointment.date + appointment.time}>
                        <td>
                          <input type="checkbox" checked={appointment.finalizada} readOnly />
                        </td>
                        <td>{formatDate(appointment.date)}</td>
                        <td>{patient ? patient.patientName : 'Paciente não encontrado'}</td>
                        <td>{patient ? patient.patientPhone : 'Telefone não encontrado'}</td>
                        <td>{doctor ? doctor.doctorName : 'Médico não encontrado'}</td>
                        <td>R$ {appointment.value.toFixed(2)}</td>
                        <td className="text-center">
                          <input type="checkbox" checked={appointment.pago} readOnly />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Financial;