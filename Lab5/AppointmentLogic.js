import React, { useState } from 'react';

function useAppointmentLogic() {
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentText, setAppointmentText] = useState('');

    const addAppointment = (selectedDate) => {
        setAppointments((prev) => [
            ...prev,
            { id: Date.now(), date: selectedDate, text: appointmentText },
        ]);
        setAppointmentText('');
    };

    const handleConfirm = (selectedDate) => {
        setDatePickerVisibility(false);
        setDate(selectedDate);

        if (selectedAppointment) {
            const updatedAppointments = appointments.map((appointment) =>
                appointment.id === selectedAppointment.id
                    ? { ...appointment, date: selectedDate, text: appointmentText }
                    : appointment
            );
            setAppointments(updatedAppointments);
            setSelectedAppointment(null);
        } else {
            addAppointment(selectedDate);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const editAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setDate(appointment.date);
        setAppointmentText(appointment.text);
        showDatePicker();
    };

    const deleteAppointment = (id) => {
        setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    };

    return {
        appointments,
        date,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        editAppointment,
        deleteAppointment,
        selectedAppointment,
        appointmentText,
        setAppointmentText,
    };
}

export default useAppointmentLogic;
