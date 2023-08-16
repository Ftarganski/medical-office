import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import MyCalendar from '../desktop/Calendar';

import doctorsData from '../../database/doctors.json';
import appointmentsData from '../../database/appointment.json';
import patientsData from '../../database/patient.json';

import './Scheduler.css';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDoctorsForSelectedDay = (selectedDate) => {
    const selectedDay = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    return doctorsData.filter(doctor => doctor.weekDay[selectedDay]);
  };

  const doctorsForSelectedDay = getDoctorsForSelectedDay(selectedDate);

  const generateTimeSlots = () => {
    const timeSlots = [];
    let currentTime = new Date(selectedDate);
    currentTime.setHours(9, 0, 0, 0);

    while (currentTime.getHours() <= 17) {
      const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });

      const doctorAppointment = appointmentsData.find(appointment =>
        appointment.date === currentTime.toISOString().split('T')[0] &&
        appointment.time === formattedTime
      );

      const patientName = doctorAppointment
        ? patientsData.find(patient => patient.patientID === doctorAppointment.patientID).patientName
        : '';

      timeSlots.push({
        time: currentTime.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: '2-digit' }),
        doctor: doctorAppointment ? doctorAppointment.doctorName : '',
        patient: patientName,
      });

      currentTime.setHours(currentTime.getHours() + 1);
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="scheduler-area p-0">
      <Container fluid className="h-100 p-0">
        <Row className="h-100">
          <Col md={4} className="h-100">
            <div className="right-column p-3 d-flex flex-column justify-content-center align-items-center">
              <Row className="w-100">
                <h2 className="mb-4">Médicos</h2>
                <ul className="list-group w-100">
                  {doctorsForSelectedDay.map((doctor, index) => (
                    <li key={index} className="list-group-item">
                      <span><strong>{doctor.doctorName}</strong> - {doctor.doctorArea}</span>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row className="p-3">
                <h2 className="mb-4">Agendar Consultas</h2>
                <MyCalendar onSelectDate={setSelectedDate} className="w-100 border-0" />
              </Row>
            </div>
          </Col>

          <Col md={4} className="h-100">
            <div className="middle-column p-3">
            <h2 className="mb-4">Agenda</h2>
              {timeSlots.map((slot, index) => (
                <div key={index} className="time-slot my-2 pt-2 border-top">
                  <strong>Horário:</strong> {slot.time}<br />
                  <strong>Médico:</strong> {slot.doctor}<br />
                  <strong>Paciente:</strong> {slot.patient}<br />
                </div>
              ))}
            </div>
          </Col>

          <Col md={4} className="h-100">
            <div className="left-column p-3">
              Paciente
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppointmentScheduler;




