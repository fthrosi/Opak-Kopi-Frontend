import { useState } from "react";

export function useFormInput<T extends Record<string, any>>(initialState: T) {
    const [form, setForm] = useState<T>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        if (type === "file" && e.target instanceof HTMLInputElement) {
            const input = e.target as HTMLInputElement;
            setForm((prevForm) => ({ ...prevForm, [name]: input.files?.[0] }));
        } else {
            setForm((prevForm) => ({ ...prevForm, [name]: value }));
        }
    };
    const resetForm = () => setForm(initialState);

    return { form,setForm, handleChange, resetForm };
}