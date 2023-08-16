import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DesktopArea from './components/DesktopArea';
import AppointmentScheduler from './components/AppointmentScheduler';
import AppointmentViewer from './components/AppointmentViewer';
import './App.css';
import './components/SidebarMenu.css'

function App() {

  const [menuActive, setMenuActive] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="App d-flex">
      <div className={`sidebar-menu ml-4 ${menuActive ? 'active' : ''}`}>
        <div className="d-flex justify-content-end p-2">
          <button className="btn btn-link text-white" onClick={toggleMenu}>
            {menuActive ? '←' : '→'}
          </button>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-dark text-white">Dashboard</li>
          <li className="list-group-item bg-dark text-white">Agendar Consulta</li>
          <li className="list-group-item bg-dark text-white">Ver Agenda</li>
        </ul>
      </div>
      <Container fluid className={`d-flex align-items-start h-100 p-4 ${menuActive ? 'menu-open' : ''}`}>
        <DesktopArea />
        <AppointmentScheduler />
        <AppointmentViewer />
      </Container>
    </div>
  );
}

export default App;