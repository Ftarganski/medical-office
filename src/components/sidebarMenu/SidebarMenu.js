import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={`sidebar-menu ml-4 ${menuActive ? 'active' : ''}`}>
      <div className="d-flex justify-content-end p-2">
        <button className="btn btn-link text-white" onClick={toggleMenu}>
          {menuActive ? <i className="bi bi-arrow-90deg-left"></i> : <i className="bi bi-arrow-90deg-right"></i>}
        </button>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-dark text-white">
          <Link to="/" className="text-white">
            {menuActive ? 'Dashboard':<i className="bi bi-speedometer2"></i> }
          </Link>
        </li>
        <li className="list-group-item bg-dark text-white">
          <Link to="/agendar-consulta" className="text-white">
            {menuActive ? 'Agendar Consulta':<i className="bi bi-pencil-square"></i> }
          </Link>
        </li>
        <li className="list-group-item bg-dark text-white">
          <Link to="/ver-agenda" className="text-white">
            {menuActive ? 'Ver Agenda' : <i className="bi bi-calendar2-date"></i> }
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
