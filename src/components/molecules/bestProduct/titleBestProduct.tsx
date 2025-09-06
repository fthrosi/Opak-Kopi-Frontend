import {Text} from "../../atoms/text";
// import Title from "../../atoms/title";
export default function TitleBestProduct() {
  return (
    <div className="text-center flex flex-col gap-3">
      {/* <Title title="Produk Penjualan Terbaik" weight="bold"/> */}
      <div className="w-full flex justify-center">
        <Text
          as="p"
          variant="body"
          weight="semiBold"
          family="lexend"
          className="text-[clamp(0.55rem,2.55vw,0.85rem)] lg:text-[clamp(0.85rem,1.57vw,1.25rem)]  w-[clamp(17rem,82vw,27rem)] lg:w-[clamp(27rem,49vw,39rem)] text-primary"
        >
          Dipilih langsung oleh pelanggan setia kami, inilah tiga menu favorit
          yang wajib kamu coba saat pertama kali datang ke kafe kami.
        </Text>
      </div>
    </div>
  );
}
