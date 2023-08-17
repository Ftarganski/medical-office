import { useState } from "react";

export function validateCPF(cpf) {
    // Remover caracteres não numéricos
    const cleanedCPF = cpf.replace(/\D/g, "");

    // Verificar se o CPF possui 11 dígitos
    if (cleanedCPF.length !== 11 || /^(\d)\1+$/.test(cleanedCPF)) {
        return false;
    }

    // Validação dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador !== parseInt(cleanedCPF.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    digitoVerificador = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador !== parseInt(cleanedCPF.charAt(10))) {
        return false;
    }
    return true;
}

export function useCPFInput() {
    const [formattedCPF, setFormattedCPF] = useState("");
    const [isCPFValid, setIsCPFValid] = useState(true);

    const formatCPF = (cpf) => {
        const cleanedInput = cpf.replace(/\D/g, "");
        const formatted = cleanedInput.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2}).*/,
            "$1.$2.$3-$4"
        );
        return formatted;
    };

    const handleCPFChange = (cpf) => {
        const formatted = formatCPF(cpf);
        setFormattedCPF(formatted);

        const isValid = validateCPF(cpf);
        setIsCPFValid(isValid);
    };

    return {
        formattedCPF,
        isCPFValid,
        handleCPFChange,
    };
}
