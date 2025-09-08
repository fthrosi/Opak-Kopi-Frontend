import CardBestProduct from "@/components/molecules/bestProduct/cardBestProduct";
import { dataBestProduct } from "@/const/constBestProduct";
import TitleDescription from "@/components/molecules/titleDescription";
import Pages from "@/components/atoms/page";
export default function BestProduct() {
  return (
    <Pages>
      <div className="py-30 flex flex-col items-center gap-15 justify-center">
        <TitleDescription
          title="Produk Penjualan Terbaik"
          description="Dipilih langsung oleh pelanggan setia kami, inilah tiga menu favorit
          yang wajib kamu coba saat pertama kali datang ke kafe kami."
          descriptionProps={{variant:"bestProduct",width:"bestProduct",textProps:{position:"center",family:"lexend",weight:"semiBold",textColor:"primary"}}}
          className="flex flex-col items-center gap-2 md:gap-3 2xl:gap-4"
          titleProps={{stroke:true,variant:"default",strokeSize:"special",strokeColor:"default",text:"broken", textProps:{as:"h2",position:"center",weight:"semiBold"}}}
        />
        <div className="grid grid-cols-1 gap-10 xs:gap-15 sm:gap-20 md:grid-cols-3 md:gap-5 lg:gap-7.5 xl:gap-10 2xl:gap-12.5">
          {dataBestProduct.map((item) => (
            <CardBestProduct
              key={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </Pages>
  );
}
