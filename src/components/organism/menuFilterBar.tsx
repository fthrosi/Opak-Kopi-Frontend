import React from "react";
import SelectLabel from "../molecules/selectLabel";
import InputForm from "../molecules/inputForm";
// import { kategoriMenu } from "@/const/kategoriMenu";
import { fetchKategoriMenu } from "@/api/kategoriMenu";
import { toast } from "sonner";
import type { MenuProps } from "@/types/menu";
import type { kategoriMenu } from "@/types/kategoriMenu";
interface MenuFilterBarProps {
  menuList: MenuProps[];
  onFilter: (filteredMenu: MenuProps[]) => void;
}

export default function MenuFilterBar({
  menuList,
  onFilter,
}: MenuFilterBarProps) {
  const [kategoriMenu, setKategoriMenu] = React.useState<kategoriMenu[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const fetchCategories = async () => {
    try {
      const categories = await fetchKategoriMenu();
      console.log(categories);
      setKategoriMenu(categories.data);
    } catch (error) {
      toast.error("Gagal memuat kategori menu");
    }
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    const filteredMenu = menuList.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || item.category.id === Number(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    onFilter(filteredMenu);
  }, [menuList, searchTerm, selectedCategory, onFilter]);

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
            getValue: (option) => option.id,
          getLabel: (option) => option.name,
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
