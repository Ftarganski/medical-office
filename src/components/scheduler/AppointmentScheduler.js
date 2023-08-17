import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import MyCalendar from '../desktop/Calendar';
import { useCPFInput } from '../../hooks/useCPFInput'

import appointmentsData from '../../database/appointment.json';
import doctorsData from '../../database/doctors.json';
import patientData from '../../database/patient.json';

import './Scheduler.css';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { formattedCPF, isCPFValid, handleCPFChange } = useCPFInput();

  const [patientForm, setPatientForm] = useState({
    patientName: '',
    patientCPF: '',
    patientBirthDate: '',
    patientAddress: '',
    patientPhone: '',
    selectedDoctor: '',
    selectedDay: '',
    selectedTime: ''
  });

  const handlePatientFormChange = (event) => {
    const { name, value } = event.target;
    setPatientForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handlePatientFormSubmit = (event) => {
    event.preventDefault();
    setPatientForm({
      patientName: '',
      patientCPF: '',
      patientBirthDate: '',
      patientAddress: '',
      patientPhone: '',
      selectedDoctor: '',
      selectedDay: '',
      selectedTime: ''
    });
  };

  const getDoctorsForSelectedDay = (selectedDate) => {
    const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    return doctorsData.filter(doctor => doctor.weekDay[selectedDay]);
  };

  const doctorsForSelectedDay = getDoctorsForSelectedDay(selectedDate);

  const filteredAppointments = appointmentsData.filter(
    (appointment) => appointment.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className="scheduler-area p-0">
      <Container fluid className="h-100 p-0">
        <Row className="h-100">
          <Col md={4} className="h-100">
            <div className="right-column p-3 d-flex flex-column justify-content-center align-items-center">
              <Row className="w-100">
                <h2 className="mb-4">Médicos</h2>
                <ul className="list-group w-100 ">
                  {doctorsForSelectedDay.map((doctor, index) => (
                    <li key={index} className="list-group-item">
                      <span><strong>{doctor.doctorName}</strong> - {doctor.doctorArea}</span>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row className="p-3">
                <h2 className="mb-4">Consulte a data</h2>
                <MyCalendar onSelectDate={setSelectedDate} className="w-100 border-0" />
              </Row>
            </div>
          </Col>

          <Col md={4} className="h-100">
            <div className="middle-column p-3">
              <h2 className="mb-4">Agenda</h2>

              {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => {
                const time = `${hour.toString().padStart(2, '0')}:00:00`;
                const isLunchTime = time === '12:00:00';
                const existingAppointment = filteredAppointments.find(
                  (appointment) => appointment.time === time
                );
                const patient = existingAppointment ? patientData[existingAppointment.patientID] : null;
                const doctor = existingAppointment ? doctorsData[existingAppointment.doctorID] : null;

                return (
                  <li key={time} className="list-group w-100">
                    <div className="border-top w-100 py-2">
                      <strong>Horário:</strong> {time}<br />
                      {isLunchTime ? (
                        <strong >----- Almoço -----</strong>
                      ) : existingAppointment ? (
                        <>
                          <strong >Paciente:</strong> {patient?.patientName}<br />
                          <strong >Médico:</strong> {doctor?.doctorName}<br />
                        </>
                      ) : (
                        <>
                          <strong >Paciente:</strong> ---<br />
                          <strong >Médico:</strong> ---<br />
                        </>
                      )}
                    </div>
                  </li>
                );
              })}

            </div>
          </Col>

          <Col md={4} className="h-100">
            <div className="left-column p-3">
              <h2 className="mb-4">Paciente</h2>
              <Form onSubmit={handlePatientFormSubmit}>

                <Form.Group controlId="patientName" className="mb-4">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    value={patientForm.patientName}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="patientCPF" className="mb-4">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientCPF"
                    value={formattedCPF}
                    onChange={(e) => {
                      handleCPFChange(e.target.value);
                      handlePatientFormChange(e);
                    }}
                    className={`form-control ${!isCPFValid ? 'is-invalid' : ''}`}
                    required
                  />
                  {!isCPFValid && (
                    <div className="invalid-feedback" style={{ color: 'red' }}>
                      CPF inválido
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="patientBirthDate" className="mb-4">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="patientBirthDate"
                    value={patientForm.patientBirthDate}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="patientAddress" className="mb-4">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientAddress"
                    value={patientForm.patientAddress}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="patientPhone" className="mb-4">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientPhone"
                    value={patientForm.patientPhone}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="selectedDoctor" className="mb-4">
                  <Form.Label>Médico</Form.Label>
                  <Form.Control
                    as="select"
                    name="selectedDoctor"
                    value={patientForm.selectedDoctor}
                    onChange={handlePatientFormChange}
                    required
                  >
                    <option value="">Selecione um médico</option>
                    {doctorsForSelectedDay.map((doctor, index) => (
                      <option key={index} value={doctor.doctorName}>{doctor.doctorName}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
                <Form.Group controlId="selectedDay" className="mb-4">
                  <Form.Label>Dia</Form.Label>
                  <Form.Control
                    type="date"
                    name="selectedDay"
                    value={patientForm.selectedDay}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="selectedTime" className="mb-4">
                  <Form.Label>Horário</Form.Label>
                  <Form.Control
                    type="time"
                    name="selectedTime"
                    value={patientForm.selectedTime}
                    onChange={handlePatientFormChange}
                    required
                  />
                </Form.Group>


                <Button type="submit" className="w-100 mt-2">Agendar</Button>
              </Form>
            </div>
          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default AppointmentScheduler;




