import CardProduk from "../molecules/cardProduk";
import { menuMakanan } from "@/const/menu";
import { Text } from "../atoms/text";
import Star from "../icons/star";
import { formatRupiah } from "@/const/idrCurrency";
import { Pages } from "../atoms/page";
import InputForm from "../molecules/inputForm";
import { Button } from "../atoms/button";
export default function MenuCatalog() {
  return (
    <Pages className="flex flex-row justify-between bg-broken h-full">
      <div className="flex flex-col gap-6">
        <div className="p-3 bg-white rounded-lg flex gap-3">
          <InputForm children="Kategori" className="w-5/11" />
          <div className="flex w-6/11 items-end gap-3">
            <InputForm children="Cari" className="w-full" />
            <Button children="Cari" />
          </div>
        </div>
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="grid lg:grid-cols-3 gap-[1.5rem]">
            {menuMakanan.map((item) => (
              <CardProduk
                key={item.id}
                imageSrc={item.imageSrc}
                contentClassName="flex flex-col justify-between"
                titleProps={{
                  className: "flex-row justify-between items-center",
                  title: item.nama,
                  titleClassName:
                    "md:text-[0.938rem] xl:text-[1rem] w-[10.188rem] text-wrap",
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
                }}
                textProps={{
                  text: formatRupiah({ value: item.harga }),
                  textAs: "p",
                  textColor: "secondary",
                }}
                buttonTextProps={{
                  className: "gap-2",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[28.3rem] h-full border-l-2 border-l-primary pl-6">
        <Text size="heading2" className="w-full text-center">Keranjang Belanja</Text>
        <div className="w-[5rem] mt-10">
            <InputForm children="No.Meja" labelSize="body" inputProps={{placeholder:"Masukkan No.Meja"}}/>
        </div>
      </div>
    </Pages>
  );
}
