import React from 'react';

const BarChart = ({ appointmentsData, selectedDate }) => {
    const generateBarChart = (appointmentsData) => {
        const days = [];

        // DEFININDO O DIA ATUAL
        const currentDayOfWeek = selectedDate.getDay();

        // DEFININDO PRIMEIRO DIA DA SEMANA
        const firstDayOfWeek = new Date(selectedDate);
        firstDayOfWeek.setDate(selectedDate.getDate() - currentDayOfWeek + 1);

        // ARRAY DA SEMANA CORRENTE EM DIAS ÚTEIS
        for (let i = -1; i < 4; i++) {
            const day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            days.push(day);
        }

        const appointmentsCount = [0, 0, 0, 0, 0];
        for (const appointment of appointmentsData) {
            const appointmentDate = new Date(appointment.date);
            for (let i = 0; i < 5; i++) {
                if (appointmentDate.toDateString() === days[i].toDateString()) {
                    appointmentsCount[i]++;
                }
            }
        }
        const maxAppointments = 8; // MÁXIMO DE CONSULTAS DIÁRIAS

        const bars = days.map((day, index) => {
            const barWidth = (appointmentsCount[index] / maxAppointments) * 100;
            return (
                <div key={index} className="horizontal-bar mr-2">

                    <div className="bar-label p-2"><h6>Dia: {new Date(day.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}</h6></div>

                    <div className="progress" style={{ width: '100%' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${barWidth}%` }}>
                            {appointmentsCount[index]}
                        </div>
                    </div>
                </div>
            );
        });
        return bars;
    };

    return (
        <div className="bar-chart-horizontal w-100 h-100 p-0 ">
            {generateBarChart(appointmentsData)}
        </div>
    );
};

export default BarChart;
