import { useState } from "react";
import { Text } from "@/components/atoms/text";
import SelectLabel from "@/components/molecules/selectLabel";
import InputForm from "@/components/molecules/inputForm";
import { meja } from "@/const/meja";
import { formatRupiah } from "@/const/idrCurrency";
import { Button } from "../atoms/button";
import type { CartItem } from "@/components/store/cart";
import CartItemComponent from "./cartItem";
import DetailHarga from "./detailHarga";
import { useCheckoutStore } from "../store/checkoutStore";
import useAuthStore from "../store/useAuthStore";
import { type User } from "@/types/user";

type CartProps = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};
const handleSubmit = (
  e: React.FormEvent,
  clearCart: () => void,
  setOnReset: (value: boolean) => void,
  cart: CartItem[],
  selectedMeja: number,
  namaPelanggan: string,
  catatan: string,
  promoId?: number,
  pointUse?: number,
  isLoggedIn?: boolean,
  user?: User | null
) => {
  e.preventDefault();

  const order_items = cart.map((item) => ({
    menu_id: item.id,
    quantity: item.qty,
  }));
  let payload;
  if (isLoggedIn) {
    payload = {
      userId: user?.userId,
      table_id: selectedMeja,
      point_use: pointUse || 0,
      promo_id: promoId || null,
      note: catatan,
      order_items,
    };
  } else {
    payload = {
      table_id: selectedMeja,
      customer_name: namaPelanggan,
      note: catatan,
      order_items,
    };
  }

  clearCart();
  setOnReset(true);
  console.log("Order payload:", payload);
  //   try {
  //
  //   } catch (error) {
  //
  //   }
};

export default function Cart({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
}: CartProps) {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const user = useAuthStore.getState().user;
  const finalTotal = useCheckoutStore((state) => state.finalTotal);
  const promoId = useCheckoutStore((state) => state.id_promo);
    const pointUse = useCheckoutStore((state) => state.point_use);
  const [onReset, setOnReset] = useState(false);
  const subTotal = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const [selectedMeja, setSelectedMeja] = useState<string>("");
  const [namaPelanggan, setNamaPelanggan] = useState<string>("");
  const [catatan, setCatatan] = useState<string>("");
  return (
    <div className="flex h-full lg:border-l-2 border-l-primary flex-col items-center lg:pl-3">
      <Text size="heading3" className="w-full text-center">
        Keranjang Belanja
      </Text>
      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            clearCart,
            setOnReset,
            cart,
            selectedMeja ? parseInt(selectedMeja) : 0,
            namaPelanggan,
            catatan,
            promoId,
            pointUse,
            isLoggedIn,
            user
          )
        }
        className="flex flex-col gap-2 w-full h-full min-h-0 pb-3"
      >
        <div className="mt-5">
          <SelectLabel
            children={
              <>
                No.Meja<span className="text-red-500">*</span>
              </>
            }
            selectProps={{
              name: "meja",
              value: selectedMeja,
              onChange: (e) => setSelectedMeja(e.target.value),
            }}
            selectFormProps={{
              placeholder: "Exp : 01",
              id: "meja",
              options: meja,
              disabled: true,
              hidden: true,
              textColor: "gray",
              bgColor: "white",
              borderColor: "white",
              focus: "white",
              formSize: "sm",
            }}
          />
        </div>
        {!isLoggedIn && (
          <InputForm
            inputId="NamaPelanggan"
            inputBgColor="white"
            inputTextColor="gray"
            inputBorderColor="white"
            inputPlaceholderColor="gray"
            inputFocus="white"
            inputFormSize="sm"
            inputProps={{
              placeholder: "Exp : Budi",
              value: namaPelanggan,
              onChange: (e) => setNamaPelanggan(e.target.value),
            }}
            children={
              <>
                Nama Pelanggan<span className="text-red-500">*</span>
              </>
            }
          />
        )}

        <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto scrollbar-hide ">
          {cart.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="pt-2 border-t-1 border-t-primary mt-2">
          <InputForm
            inputId="Catatan"
            inputBgColor={"white"}
            inputTextColor="gray"
            inputBorderColor="white"
            inputProps={{
              placeholder: "Exp : Jangan terlalu manis",
                value: catatan,
                onChange: (e) => setCatatan(e.target.value),
            }}
            children={
              <>
                Catatan <span className="text-primary/50">(optional)</span>
              </>
            }
          />
        </div>
        <DetailHarga subTotal={subTotal} onReset={onReset} />
        <div className="flex justify-between px-2">
          <Text size="body" weight="semiBold">
            Total Harga
          </Text>
          <Text size="body" weight="semiBold">
            {formatRupiah({ value: finalTotal ?? 0 })}
          </Text>
        </div>
        <Button type="submit" className="mt-1">
          Pesan
        </Button>
      </form>
    </div>
  );
}
