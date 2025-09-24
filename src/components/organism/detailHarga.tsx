import { useState, useEffect } from "react";
import { Text } from "../atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import VoucherIcon from "../icons/voucher";
import PoinIcon from "../icons/poin";
import InputForm from "../molecules/inputForm";
import { checkPromoCode } from "@/api/promo";
import useAuthStore from "../store/useAuthStore";
import { useCheckoutStore } from "../store/checkoutStore";
import { toast } from "sonner";

export default function DetailHarga({
  subTotal,
  onReset,
}: {
  subTotal: number;
  onReset: boolean;
}) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const setFinalTotal = useCheckoutStore((state) => state.setFinalTotal);
  const [promo, setPromo] = useState("");
  const [poin, setPoin] = useState("");
  const [discount, setDiscount] = useState(0);
  const [diskonPoin, setDiskonPoin] = useState(0);
  const setIdPromo = useCheckoutStore((state) => state.setIdPromo);
  const setPointUse = useCheckoutStore((state) => state.setPointUse);
  const setValidPromo = useCheckoutStore((state) => state.setValidPromo);
  const setValidPoin = useCheckoutStore((state) => state.setValidPoin);
  async function handlePromoCheck() {
    if (promo) {
      try {
        const res = await checkPromoCode(promo);
        console.log(res);
        if (res.data?.promo_type === "percent") {
          setDiscount((subTotal * res.data.percent_value) / 100);
        } else if (res.data?.promo_type === "amount") {
          setDiscount(res.data.amount_value);
        }
        setIdPromo(res.data.id);
        setValidPromo(true);
      } catch (error: any) {
        setDiscount(0);
        toast.error(error.message || "Gagal cek promo");
        setIdPromo(undefined);
        setValidPromo(false);
        return;
      }
    } else {
      setDiscount(0);
      setIdPromo(undefined);
      setValidPromo(true);
      return;
    }
  }
  const handlecheckPoin = () => {
    if (poin) {
      const inputPoin = parseInt(poin);
      if (inputPoin > (user?.poin || 0)) {
        setDiskonPoin(0);
        setPointUse(0);
        setValidPoin(false);
        toast.error("Poin tidak mencukupi");
        return;
      } else {
        setDiskonPoin(inputPoin * 100);
        setPointUse(inputPoin);
        setValidPoin(true);
      }
    } else {
      setPointUse(0);
      setDiskonPoin(0);
      setValidPoin(true);
      return;
    }
  };
  let totalDiscount = discount + diskonPoin;
  const finalTotal = subTotal - totalDiscount;

  useEffect(() => {
    if (onReset) {
      setPromo("");
      setPoin("");
      setDiscount(0);
      setDiskonPoin(0);
      setIdPromo(undefined);
      setPointUse(0);
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
              onChange: (e) => {
                setPromo(e.target.value);
                if (e.target.value === "") setValidPromo(true);
                else setValidPromo(false);
              },
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
              onChange: (e) => {
                setPoin(e.target.value);
                if (e.target.value === "") setValidPoin(true);
                else setValidPoin(false);
              },
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
