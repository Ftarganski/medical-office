import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import MyCalendar from './Calendar';
import appointmentsData from '../../database/appointment.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DesktopArea.css';
import BarChart from './BarChart';
import './BarChart.css';
import RightHalfContent from './RightHalfContent';


const DesktopArea = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const filteredAppointments = appointmentsData.filter(
        (appointment) => appointment.date === selectedDate.toISOString().split('T')[0]
    );

    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    return (
        <div className="desktop-area  p-0">
            <Container fluid className=" h-100 p-0 ">
                <Row className=" h-100">
                    <Col md={8} className=" h-100">
                        <div className="left-column p-3">

                            <Row className="p-3">
                                <Form>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Pesquisar" />
                                    </Form.Group>
                                </Form>
                            </Row>
                            <h2>Dashbord</h2>
                            <Row className="p-3 m-0">
                                <Col md={8} className="bar-chart p-0">
                                    <BarChart appointmentsData={appointmentsData} />
                                </Col>
                                <Col md={4} className="p-0 d-flex justify-content-end ">
                                    <RightHalfContent selectedDate={selectedDate} appointmentsData={filteredAppointments} className="w-100"/>
                                </Col>
                            </Row>
                            <h2>Apontamentos</h2>
                            <Row className="p-3">
                                base
                            </Row>

                        </div>
                    </Col>
                    <Col md={4} className=" h-100">
                        <div className="right-column p-3 d-flex flex-column justify-content-center align-items-center">
                            <h2 className="mb-4">Calendário de Consultas</h2>
                            <MyCalendar onSelectDate={setSelectedDate} className="w-100 border-0" />
                            <div className="appointments p-3 d-flex flex-column justify-content-center align-items-center w-100">
                                <h4 className="mb-4">Consultas Agendadas</h4>
                                <ul className="list-group w-100">
                                    {chunkArray(filteredAppointments, 2).map((appointmentsPair, index) => (
                                        <li key={index} className="list-group-item d-flex">
                                            {appointmentsPair.map((appointment, innerIndex) => (
                                                <div key={innerIndex} className="col-md-6">
                                                    <strong>Paciente:</strong> {appointment.patientName}<br />
                                                    <strong>Fone:</strong> {appointment.patientPhone} <br />
                                                    <strong>Médico:</strong> {appointment.doctor}<br />
                                                    <strong>Horário:</strong> {appointment.time}
                                                </div>
                                            ))}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DesktopArea;
