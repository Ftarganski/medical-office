import { useState } from "react";

export function usePhoneMask(initialValue = "") {
    const [formattedPhone, setFormattedPhone] = useState(initialValue);

    const formatPhone = (phone) => {
        const cleanedInput = phone.replace(/\D/g, "");

        if (cleanedInput.length === 11) {
            return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(
                2,
                5
            )} ${cleanedInput.slice(5, 8)} ${cleanedInput.slice(8)}`;
        } else if (cleanedInput.length === 10) {
            return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(
                2,
                6
            )}-${cleanedInput.slice(6)}`;
        } else {
            return cleanedInput;
        }
    };

    const handlePhoneChange = (phone) => {
        const formatted = formatPhone(phone);
        setFormattedPhone(formatted);
    };

    return {
        formattedPhone,
        handlePhoneChange,
    };
}
