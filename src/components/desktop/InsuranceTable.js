import React from 'react';
import { FaPhone } from 'react-icons/fa'

const InsuranceTable = ({ insuranceAprovalData, insuranceCompanyData, patientData, doctorsData }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Convênio</th>
                    <th className="text-center">Aprovação</th>
                    <th className='d-flex align-items-center justify-content-center'>Ligar Plano</th>
                </tr>
            </thead>
            <tbody>
                {insuranceAprovalData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{patientData[item.patientId]?.patientName}</td>
                        <td>{doctorsData[item.doctorId]?.doctorName}</td>
                        <td>{insuranceCompanyData[item.insuranceCompanyID]?.insuranceCompany}</td>
                        <td className={`font-weight-bold text-center ${item.approval === 'Aprovado' ? 'text-success' :
                            item.approval === 'Pendente' ? 'text-warning' :
                                item.approval === 'Reprovado' ? 'text-danger' : ''
                            }`}
                        >
                            {item.approval}
                        </td>
                        <td className='d-flex align-items-center justify-content-center'>
                            <a href={`tel:${insuranceCompanyData[item.insuranceCompanyID]?.insurancePhone}`}>
                                <FaPhone />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InsuranceTable;
