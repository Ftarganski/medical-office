import React from 'react';
import { Route, Routes } from 'react-router-dom'
import DesktopArea from '../components/desktop/DesktopArea';
import AppointmentScheduler from '../components/AppointmentScheduler';
import AppointmentViewer from '../components/AppointmentViewer';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<DesktopArea />} />
            <Route path="/agendar-consulta" component={AppointmentScheduler} />
            <Route path="/ver-agenda" component={AppointmentViewer} />
        </Routes>
    );
};

export default RoutesApp;

