import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import MyCalendar from './Calendar';
import appointmentsData from '../database/appointment.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DesktopArea.css';
import BarChart from './BarChart'; 
import './BarChart.css'


const DesktopArea = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const filteredAppointments = appointmentsData.filter(
        (appointment) => appointment.date === selectedDate.toISOString().split('T')[0]
    );

    return (
        <div className="desktop-area p-0">
            <Container fluid className="p-0">
                <Row>
                    <Col md={7}>
                        <div className="left-column p-3">
                            <div className="search-form p-3">
                                <Form>
                                    <Form.Group>
                                        <Form.Control type="text" placeholder="Pesquisar" />
                                    </Form.Group>
                                </Form>
                            </div>


                            <div className="middle-row p-3">
                                <Row>
                                    <div className="bar-chart">
                                    <BarChart appointmentsData={appointmentsData} />
                                    </div>
                                    <Col md={6}>
                                        {/* Content for right half of middle row */}
                                    </Col>
                                </Row>
                            </div>



                            <div className="bottom-row p-3">
                                {/* Content for bottom row */}
                            </div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="right-column p-3">
                            <MyCalendar onSelectDate={setSelectedDate} className="w-100 border-0" />
                            <div className="appointments p-3">
                                <h2 className="mb-4">Agendamentos diários:</h2>
                                <ul className="list-group">
                                    {filteredAppointments.map((appointment, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>Paciente:</strong> {appointment.patientName} -  {appointment.patientPhone}<br />
                                            <strong>Médico:</strong> {appointment.doctor}<br />
                                            <strong>Horário:</strong> {appointment.time}
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
