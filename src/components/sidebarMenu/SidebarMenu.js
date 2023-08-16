import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import './SidebarMenu.css';
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { BsCalendarPlus, BsCalendar2Month } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

const SidebarMenu = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={`sidebar-menu ml-4 ${menuActive ? 'active' : ''}`}>
      <div className="d-flex justify-content-end p-2">
        <button className="btn btn-link text-white" onClick={toggleMenu}>
          {menuActive ? <FaAnglesLeft size={20} /> : <FaAnglesRight size={20} />}
        </button>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-dark text-white">
          <Link to="/" className="text-white text-decoration-none">
            {menuActive ? 'Dashboard' : <MdOutlineDashboard size={20} />}
          </Link>
        </li>
        <li className="list-group-item bg-dark text-white">
          <Link to="/agendar-consulta" className="text-white text-decoration-none">
            {menuActive ? 'Agendar Consulta' : <BsCalendarPlus size={20} />}
          </Link>
        </li>
        <li className="list-group-item bg-dark text-white">
          <Link to="/ver-agenda" className="text-white text-decoration-none">
            {menuActive ? 'Ver Agenda' : <BsCalendar2Month size={20} />}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;