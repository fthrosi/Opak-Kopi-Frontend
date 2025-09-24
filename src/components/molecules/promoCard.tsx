import Img from "../atoms/img";
import { Text } from "../atoms/text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { promoType } from "@/types/promoType";
import { formatRupiah } from "@/const/idrCurrency";

const promoCardVariants = cva(
  "flex flex-col rounded-lg overflow-hidden hover:shadow-md",
  {
    variants: {
      cardSize: {
        default: "md:aspect-[4/2] xs:w-[30rem] h-[10rem] w-[clamp(19rem,89vw,30rem)] md:h-auto md:w-full",
        modal: ""
      },
      background: {
        white: "bg-white",
        broken: "bg-broken",
      },
    },
    defaultVariants: {
      cardSize: "default",
      background: "white",
    },
  }
);
const promoCardContentVariants = cva("h-full flex flex-col justify-between", {
  variants: {
    padding: {
      default: "py-1 px-2",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export interface PromoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof promoCardVariants>,
    VariantProps<typeof promoCardContentVariants> {
  className?: string;
  contentClassName?: string;
  promo: promoType;
  oncardclick?: () => void;
  isDetail?: boolean;
  isModal?: boolean;
}

export default function PromoCard({
  className,
  contentClassName,
  cardSize,
  background,
  padding,
  promo,
  oncardclick,
  isDetail = false,
  isModal = false,
}: PromoCardProps) {
  const tanggalMulai = promo.start_date.split("T")[0];
  const tanggalSelesai = promo.end_date.split("T")[0];
  return (
    <div
      className={cn(promoCardVariants({ cardSize, background }), className)}
      onClick={oncardclick}
    >
      <Img src="/image/Voucher.png" alt="voucher" className="h-1/2" />
      <div
        className={cn(promoCardContentVariants({ padding }), contentClassName)}
      >
        <Text
          size="heading3"
          weight="semiBold"
          textColor="secondary"
          className={`lg:text-[clamp(1rem,1.55vw,1.2rem)] ${isModal? "lg:text-[1.5rem]" : ""}`}
        >
          {promo.name}
        </Text>
        <Text size="body" className={`lg:text-[clamp(0.875rem,1.3vw,1rem)] text-[0.875rem] ${isModal ? "mt-1 text-[0.75rem] xs:text-[0.875rem] lg:text-[1rem]" : ""}`}>
          Nikmati Diskon sebesar{" "}
          {promo.promo_type == "percent"
            ? promo.percent_value + "%"
            : formatRupiah({ value: promo.amount_value ?? 0 })}
        </Text>
        {isModal && isDetail && (
          <div>
            <Text size="body" className="text-[0.75rem] xs:text-[0.875rem] mt-1 lg:text-[0.9rem]" >{promo.description}</Text>
            <Text size="caption" className="mt-1 xs:text-[0.875rem] lg:text-[1rem]">
              <span className="text-secondary font-semibold">Syarat dan ketentuan :</span> <br />{" "}
              <span className="text-[0.7rem] xs:text-[0.750rem] lg:text-[0.9rem]">{promo?.promo_menus?.map((menu) => menu.menu.name).length! > 0
                ? `Transaksi harus menyertakan menu ${promo?.promo_menus
                    ?.map((menu) => menu.menu.name)
                    .join(", ")}`
                : `Transaksi memiliki nilai minimum ${formatRupiah({ value: promo.minimum_purchase ?? 0 })} `}
              </span>
            </Text>
            <Text size="body" className="mt-1"><span className="text-secondary font-semibold">Promo Code : </span>{promo.promo_code}</Text>
          </div>
        )}
        <Text
          size="caption"
          textColor="secondary"
          className={`opacity-70 lg:text-[0.750rem] ${isModal ? "mt-1" : ""}`}
        >
          Berlaku dari {tanggalMulai} hingga {tanggalSelesai}
        </Text>
      </div>
    </div>
  );
}
