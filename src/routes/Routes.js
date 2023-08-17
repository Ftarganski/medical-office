import React from 'react';
import { Route, Routes } from 'react-router-dom'
import DesktopArea from '../components/desktop/DesktopArea';
import AppointmentScheduler from '../components/scheduler/AppointmentScheduler';
import Financial from '../components/viewer/Financial';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<DesktopArea />} />
            <Route path="/agendar-consulta"element={<AppointmentScheduler/>} />
            <Route path="/financial" element={<Financial/>} />
        </Routes>
    );
};

export default RoutesApp;

