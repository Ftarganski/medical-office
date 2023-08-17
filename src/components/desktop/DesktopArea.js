import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import MyCalendar from './Calendar';

import AppointmentList from './AppointmentList';
import BarChart from './BarChart';
import DataContent from './DataContent';
import InsuranceTable from './InsuranceTable';

import insuranceAprovalData from '../../database/insuranceAproval.json';
import appointmentsData from '../../database/appointment.json';
import doctorsData from '../../database/doctors.json';
import patientData from '../../database/patient.json';
import insuranceCompanyData from '../../database/insuranceCompany.json'

import './BarChart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DesktopArea.css';

const DesktopArea = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
  
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

                            <h2 className="p-4">Dashbord Semanal</h2>
                            <Row className="p-3 m-0">
                                <Col md={8} className="bar-chart p-0">
                                    <BarChart appointmentsData={appointmentsData} selectedDate={selectedDate} />  </Col>
                                <Col md={4} className="p-0 d-flex justify-content-end ">
                                    <DataContent selectedDate={selectedDate} appointmentsData={appointmentsData} doctorsData={doctorsData} />
                                </Col>
                            </Row>

                            <h2 className="p-4">Aprovações Convênio</h2>
                            <Row className="p-3 m-0" >
                                <InsuranceTable insuranceAprovalData={insuranceAprovalData} doctorsData={doctorsData} insuranceCompanyData={insuranceCompanyData} patientData={patientData} />
                            </Row>

                        </div>
                    </Col>

                    <Col md={4} className=" h-100">
                        <div className="right-column p-3 d-flex flex-column justify-content-center align-items-center">
                            <h2 className="mb-4">Calendário de Consultas</h2>
                            <MyCalendar onSelectDate={setSelectedDate} className="w-100 border-0" />
                            <AppointmentList
                                appointmentsData={appointmentsData}
                                selectedDate={selectedDate}
                                patientData={patientData}
                                doctorsData={doctorsData}
                            />
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default DesktopArea;
