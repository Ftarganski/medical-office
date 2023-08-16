import React from 'react';
import { Route, Routes } from 'react-router-dom'
import DesktopArea from '../components/desktop/DesktopArea';
import AppointmentScheduler from '../components/AppointmentScheduler';
import AppointmentViewer from '../components/AppointmentViewer';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<DesktopArea />} />
            <Route path="/agendar-consulta"element={<AppointmentScheduler/>} />
            <Route path="/ver-agenda" element={<AppointmentViewer/>} />
        </Routes>
    );
};

export default RoutesApp;

