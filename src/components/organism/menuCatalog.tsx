import CardProduk from "../molecules/cardProduk";
import { menuMakanan } from "@/const/menu";
import { Text } from "../atoms/text";
import Star from "../icons/star";
import { formatRupiah } from "@/const/idrCurrency";
import { Pages } from "../atoms/page";
import InputForm from "../molecules/inputForm";
import SelectLabel from "../molecules/selectLabel";
import { kategoriMenu } from "@/const/kategoriMenu";
import { useState } from "react";

export default function MenuCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMenu = menuMakanan.filter((item) => {
    const matchesCategory =
      selectedCategory === "" || item.kategori === selectedCategory;
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  console.log("Filtered Menu:", filteredMenu);

  return (
    <Pages className="flex flex-row justify-between bg-broken h-full">
      <div className="flex flex-col gap-6 w-full md:mr-3">
        <div className="p-3 bg-white rounded-lg flex flex-col xs:flex-row gap-3">
          <SelectLabel
            children="Kategori"
            className="xs:w-1/2"
            selectFormProps={{
              placeholder: "Semua",
              id: "kategori",
              options: kategoriMenu,
              formSize: "sm",
              className: "text-[0.68rem]"
            }}
            selectProps={{
              value: selectedCategory,
              onChange: (e) => setSelectedCategory(e.target.value),
            }}
          />
          <div className="flex xs:w-1/2 items-end gap-3">
            <InputForm
              inputId="cari"
              children="Cari"
              className="w-full"
              labelSize="default"
              inputFormSize="sm"
              inputProps={{
                placeholder: "Cari Menu",
                onChange: (e) => setSearchTerm(e.target.value),
                value: searchTerm,
              }}
            />
          </div>
        </div>
        <div className="h-full mx-auto md:m-0 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-[1.5rem]">
            {filteredMenu.map((item) => (
              <CardProduk
                key={item.id}
                imageSrc={item.imageSrc}
                contentClassName="flex flex-col justify-between"
                titleProps={{
                  className: "flex-row justify-between items-center",
                  title: item.nama,
                  titleClassName:
                    "text-[clamp(0.938rem,1.6vw,1rem)] md:text-[0.938rem] xl:text-[1rem] w-[10.188rem] text-wrap",
                  titleStroke: false,
                  titleSize: "custom",
                  titleWidth: "custom",
                  titleWeight: "semiBold",
                  titleColor: "secondary",
                  children: (
                    <div className="flex items-center">
                      <Star className="size-3 text-amber-300 mr-1" />
                      <Text size="caption">{item.rating}</Text>
                    </div>
                  ),
                }}
                buttonProps={{
                  buttonVariant: "default",
                  button: true,
                  children: "Masukan Keranjang",
                  buttonClassName: "py-2 text-xs 2xl:text-sm",
                }}
                textProps={{
                  text: formatRupiah({ value: item.harga }),
                  textAs: "p",
                  textColor: "secondary",
                  textSize: "body",
                }}
                buttonTextProps={{
                  className: "gap-2",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[28.3rem] h-full border-l-2 border-l-primary pl-6">
        <Text size="heading2" className="w-full text-center">
          Keranjang Belanja
        </Text>
        <div className="w-[5rem] mt-10">
          <InputForm
            children="No.Meja"
            labelSize="body"
            inputProps={{ placeholder: "Masukkan No.Meja" }}
          />
        </div>
      </div>
    </Pages>
  );
}
