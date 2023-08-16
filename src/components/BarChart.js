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

        const bars = weeks.map((week, index) => {
            const barHeight = (appointmentsCount[index] / Math.max(...appointmentsCount)) * 100;
            return (
                <div className="bar" key={index}>
                    <div className="bar-fill" style={{ height: `${barHeight}%` }}>
                        {appointmentsCount[index]}
                    </div>
                    <div className="bar-label">{week.start.toLocaleDateString()}</div>
                </div>
            );
        });

        return bars;
    };

    return (
        <div className="bar-chart">
            {generateBarChart(appointmentsData)}
        </div>
    );
};

export default BarChart;
