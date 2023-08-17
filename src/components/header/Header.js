import React from 'react';

import { IoMedkit } from "react-icons/io5";
import {AiOutlineInstagram} from "react-icons/ai";
import './Header.css';


const Header = () => {
    return (
        <div className="d-flex justify-content-center  p-0 bg-dark w-100 navbar" >
            <div className="mx-4 d-flex justify-content-center align-self-center h-100">
                <IoMedkit  size={40} className="my-icon mx-4  my-0 h-100"/>
                <h1 className="text-white mx-4 my-0 h-100">Medical Office Company</h1>
            </div>

            <div className="mx-4 d-flex justify-content-center align-items-center flex-row h-100">
                <h6 className="d-flex flex-column text-white mx-2 h-100 my-0 justify-content-center align-items-center">Rua das Palmeiras, 365 / Sala 01</h6>
                <h6 className="d-flex flex-column text-white mx-2 h-100 my-0 justify-content-center align-items-center">+55 11 987 125 958</h6>
                <h6 className="d-flex flex-row text-white mx-2 h-100 my-0 justify-content-center align-items-center"><AiOutlineInstagram color="white" size={20} className="my-0 h-100"/>medical_office</h6>
            </div>

        </div>
    );
};

export default Header;
