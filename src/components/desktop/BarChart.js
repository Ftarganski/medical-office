import React from 'react';

const BarChart = ({ appointmentsData }) => {
    const generateBarChart = (appointmentsData) => {
        const currentDate = new Date();
        const weeks = [];
        for (let i = 0; i < 5; i++) {
            const firstDayOfWeek = new Date(currentDate);
            firstDayOfWeek.setDate(currentDate.getDate() + i * 7 - currentDate.getDay());
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
            weeks.push({ start: firstDayOfWeek, end: lastDayOfWeek });
        }

        const appointmentsCount = [0, 0, 0, 0, 0];
        for (const appointment of appointmentsData) {
            const appointmentDate = new Date(appointment.date);
            for (let i = 0; i < 5; i++) {
                if (appointmentDate >= weeks[i].start && appointmentDate <= weeks[i].end) {
                    appointmentsCount[i]++;
                }
            }
        }

        const maxAppointments = Math.max(...appointmentsCount);

        const bars = weeks.map((week, index) => {
            const barWidth = (appointmentsCount[index] / maxAppointments) * 100;
            return (
                <div key={index} className="horizontal-bar mr-2">
                    <div className="bar-label p-2"><h6>Semana: {week.start.toLocaleDateString()}</h6></div>
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
        <div className="bar-chart-horizontal w-100 h-100  p-0 ">
            {generateBarChart(appointmentsData)}
        </div>
    );
};

export default BarChart;

