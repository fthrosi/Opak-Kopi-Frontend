import React from "react";
import SelectLabel from "../molecules/selectLabel";
import InputForm from "../molecules/inputForm";
import { kategoriMenu } from "@/const/kategoriMenu";
import { menuMakanan } from "@/const/menu";

interface MenuFilterBarProps {
    onFilter : (filtereMenu: typeof menuMakanan) => void;
}

export default function MenuFilterBar({onFilter}: MenuFilterBarProps) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");

    React.useEffect(() => {
        const filteredMenu = menuMakanan.filter(item => {
            const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "" || item.kategori === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        onFilter(filteredMenu);
    }, [searchTerm, selectedCategory, onFilter]);

    return (
        <div className="p-3 bg-white rounded-lg flex flex-col xs:flex-row gap-3">
            <SelectLabel
                children="Kategori"
                className="w-full"
                selectFormProps={{
                    placeholder: "Semua",
                    id: "kategori",
                    options: kategoriMenu,
                    formSize: "sm",
                    className: "2xl:h-9",
                }}
                selectProps={{
                    value: selectedCategory,
                    onChange: (e) => setSelectedCategory(e.target.value),
                }}
            />
            <InputForm
                inputId="cari"
                children="Cari"
                className="w-full"
                labelSize="default"
                inputFormSize="sm"
                inputClassName="2xl:h-9"
                inputProps={{
                    placeholder: "Cari Menu",
                    onChange: (e) => setSearchTerm(e.target.value),
                    value: searchTerm,
                }}
            />
        </div>
    );
}