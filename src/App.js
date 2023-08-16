import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './index.css';
import './components/SidebarMenu.css'
import RoutesApp from './routes/Routes';

function App() {

  const [menuActive, setMenuActive] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <BrowserRouter>
    <div className="App d-flex">
        <div className={`sidebar-menu ml-4 ${menuActive ? 'active' : ''}`}>
            <div className="d-flex justify-content-end p-2">
                <button className="btn btn-link text-white" onClick={toggleMenu}>
                    {menuActive ? '←' : '→'}
                </button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white">
                    <Link to="/dashboard" className="text-white">Dashboard</Link>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <Link to="/agendar-consulta" className="text-white">Agendar Consulta</Link>
                </li>
                <li className="list-group-item bg-dark text-white">
                    <Link to="/ver-agenda" className="text-white">Ver Agenda</Link>
                </li>
            </ul>
        </div>
      <Container fluid className="d-flex align-items-start p-4 ">
        <RoutesApp />
      </Container>
    </div>
    </BrowserRouter>
  );
}

export default App;