import TitleBestProduct from "../../molecules/bestProduct/titleBestProduct";
import CardBestProduct from "@/components/molecules/bestProduct/cardBestProduct";
import { dataBestProduct } from "@/const/constBestProduct";
export default function BestProduct(){
    return (
        <section className="py-30 flex flex-col items-center gap-15 xl:min-h-dvh justify-center">
            <TitleBestProduct />
            <div className="grid grid-cols-1 gap-10 xs:gap-15 sm:gap-20 md:grid-cols-3 md:gap-5 lg:gap-7.5 xl:gap-10 2xl:gap-12.5">
                {dataBestProduct.map((item) =>
                    <CardBestProduct key={item.id} name={item.name} image={item.image} />
                )}
            </div>
        </section>
    );
}
