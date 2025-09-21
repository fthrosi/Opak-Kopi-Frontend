import { useState, useEffect } from "react";
import { Text } from "../atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import VoucherIcon from "../icons/voucher";
import PoinIcon from "../icons/poin";
import InputForm from "../molecules/inputForm";
import { checkPromoCode } from "@/api/promo";
import useAuthStore from "../store/useAuthStore";
import { useCheckoutStore } from "../store/checkoutStore";
export default function DetailHarga({ subTotal, onReset }: { subTotal: number, onReset: boolean }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const setFinalTotal = useCheckoutStore((state) => state.setFinalTotal);
  const [promo, setPromo] = useState("");
  const [poin, setPoin] = useState("");
  const [discount, setDiscount] = useState(0);
  const [diskonPoin, setDiskonPoin] = useState(0);
  async function handlePromoCheck() {
    if (promo) {
      console.log(promo);
      try {
        const res = await checkPromoCode(promo);
        console.log(res);
        if (res.data?.promo_type === "percent") {
          setDiscount((subTotal * res.data.percent_value) / 100);
        } else if (res.data?.promo_type === "amount") {
          setDiscount(res.data.amount_value);
        }
      } catch {
        
      }
    }
  }
  const handlecheckPoin = () => {
    if (poin) {
      const inputPoin = parseInt(poin);
      if (inputPoin > (user?.poin || 0)) {
        console.log("Poin tidak cukup");
        setDiskonPoin(0);
      } else {
        setDiskonPoin(inputPoin * 100);
      }
    }
  };
  let totalDiscount = discount + diskonPoin;
  const finalTotal = subTotal - totalDiscount;

  useEffect(() => {
    if (onReset){
        setPromo("");
        setPoin("");
        setDiscount(0);
        setDiskonPoin(0);
    }
    }, [onReset]);
  useEffect(() => {
    setFinalTotal(finalTotal);
  }, [finalTotal]);
  return (
    <div className="bg-white p-2 flex flex-col gap-2 rounded-lg">
      {isLoggedIn && (
        <>
          <InputForm
            inputId="Promo"
            className="flex-row justify-between items-center"
            inputClassName="w-[9rem] text-[0.7rem] 2xl:text-sm"
            inputFormSize="sm"
            inputProps={{
              placeholder: "Masukan Kode Promo",
              value: promo,
              onChange: (e) => setPromo(e.target.value),
              onBlur: handlePromoCheck,
            }}
            children={
              <div className="flex gap-2">
                <VoucherIcon className="size-5 text-primary mr-1" /> Promo
              </div>
            }
            labelSize="default"
          />
          <InputForm
            inputId="Poin"
            className="flex-row justify-between items-center"
            inputClassName="w-[9rem] text-[0.7rem] 2xl:text-sm"
            inputFormSize="sm"
            inputVariant="number"
            inputProps={{
              placeholder: "Masukan Jumlah Poin",
              value: poin,
              onChange: (e) => setPoin(e.target.value),
              onBlur: handlecheckPoin,
            }}
            children={
              <div className="flex gap-2">
                <PoinIcon className="size-5 text-primary mr-1" /> Poin
              </div>
            }
            labelSize="default"
          />
        </>
      )}

      <div className="flex justify-between">
        <Text size="caption" weight="semiBold">
          Sub Total
        </Text>
        <Text size="caption" weight="semiBold">
          {formatRupiah({ value: subTotal ?? 0 })}
        </Text>
      </div>
      <div className="flex justify-between">
        <Text size="caption" weight="semiBold">
          Potongan
        </Text>
        <Text size="caption" weight="semiBold">
          {formatRupiah({ value: totalDiscount ?? 0 })}
        </Text>
      </div>
    </div>
  );
}
