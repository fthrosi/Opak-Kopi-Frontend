import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@/components/atoms/text";
import SelectLabel from "@/components/molecules/selectLabel";
import InputForm from "@/components/molecules/inputForm";
import { formatRupiah } from "@/const/idrCurrency";
import { Button } from "../atoms/button";
import type { CartItem } from "@/components/store/cart";
import CartItemComponent from "./cartItem";
import DetailHarga from "./detailHarga";
import { useCheckoutStore } from "../store/checkoutStore";
import useAuthStore from "../store/useAuthStore";
import { toast } from "sonner";
import { fetchtables } from "@/api/tables";
import { metodePembayaran } from "@/const/metodePemabayaran";
import { addOrder } from "@/api/orders";
import {
  orderSchemaLogin,
  orderSchemaGuest,
  kasirSchema,
} from "@/validateSchema/pesanan";
import { cn } from "@/lib/utils";

type CartProps = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  onclose?: () => void;
  classname?: string;
};

export default function Cart({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  classname,
  onclose,
}: CartProps) {
  const navigate = useNavigate();
  const [metodePembayaranSelected, setMetodePembayaranSelected] =
    useState<string>("");
  const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const isPelanggan = user?.role.name === "Pelanggan";
  const finalTotal = useCheckoutStore((state) => state.finalTotal);
  const promoId = useCheckoutStore((state) => state.id_promo);
  const pointUse = useCheckoutStore((state) => state.point_use);
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMetodePembayaranSelected(e.target.value);
  };
  const [onReset, setOnReset] = useState(false);
  const subTotal = cart.reduce(
    (sum, item) => sum + item.current_price * item.qty,
    0
  );
  const [selectedMeja, setSelectedMeja] = useState<string>("");
  const [namaPelanggan, setNamaPelanggan] = useState<string>("");
  const [catatan, setCatatan] = useState<string>("");
  const validPoin = useCheckoutStore((state) => state.validPoin);
  const validPromo = useCheckoutStore((state) => state.validPromo);
  const [Meja, setMeja] = useState<
    { id: number; number: number; status: string }[]
  >([]);
  const menuId = cart.map((item) => item.id);
  const fetchTable = async () => {
    try {
      const tables = await fetchtables();
      setMeja(tables.data);
    } catch (error) {
      toast.error("Gagal mengambil data meja");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const order_items = cart.map((item) => ({
      menu_id: item.id,
      quantity: item.qty,
    }));
    let payload;
    if (isLoggedIn && isPelanggan) {
      payload = {
        userId: user?.userId,
        table_id: selectedMeja,
        point_use: pointUse || 0,
        promo_id: promoId || null,
        note: catatan,

        order_items,
      };
    } else if (isLoggedIn && !isPelanggan) {
      payload = {
        customer_name: namaPelanggan,
        userId: user?.userId,
        table_id: selectedMeja,
        note: catatan,
        order_items,
        payment_method: metodePembayaranSelected || "",
      };
    } else {
      payload = {
        table_id: selectedMeja,
        customer_name: namaPelanggan,
        note: catatan,
        order_items,
      };
    }
    if (isLoggedIn && isPelanggan) {
      const validation = orderSchemaLogin.safeParse(payload);
      if (!validation.success) {
        const firstError = validation.error.issues[0];
        toast.error(firstError.message);
        return;
      }
      payload = validation.data;
      if (!validPromo) {
        return;
      }
      if (!validPoin) {
        return;
      }
    } else if (isLoggedIn && !isPelanggan) {
      const validation = kasirSchema.safeParse(payload);
      if (!validation.success) {
        const firstError = validation.error.issues[0];
        toast.error(firstError.message);
        return;
      }
      payload = validation.data;
    } else {
      const validation = orderSchemaGuest.safeParse(payload);
      if (!validation.success) {
        const firstError = validation.error.issues[0];
        toast.error(firstError.message);
        return;
      }
      payload = validation.data;
    }
    try {
      const result = await addOrder(payload);
      console.log(result);
      clearCart();
      setSelectedMeja("");
      setNamaPelanggan("");
      setCatatan("");
      setOnReset(true);
      onclose && onclose();
      const { payment_token } = result;

      if (payment_token) {
        (window as any).snap.pay(payment_token, {
          onSuccess: function () {
            toast.success("Pembayaran berhasil!");
            {
              isLoggedIn ? navigate("/history-order") : navigate("/menu");
            }
          },
          onError: function () {
            toast.error("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: function () {
            toast.info("Anda menutup popup tanpa menyelesaikan pembayaran");
          },
        });
      } else {
        toast.success("Pesanan berhasil dibuat!");
        navigate("/history-order");
      }
    } catch (error) {
      toast.error("Gagal mengirim pesanan");
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);
  useEffect(() => {
    if (!document.querySelector("#midtrans-script")) {
      const script = document.createElement("script");
      script.id = "midtrans-script";
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div
      className={cn(
        `flex h-full lg:border-l-2 border-l-primary flex-col items-center lg:pl-3`,
        classname
      )}
    >
      <Text size="heading3" className="w-full text-center">
        Keranjang Belanja
      </Text>
      <form
        onSubmit={(event) => handleSubmit(event)}
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
              getValue: (option) => option.id,
              getLabel: (option) => `Meja - ${option.number}`,
            }}
            selectFormProps={{
              placeholder: "Exp : 01",
              id: "meja",
              options: Meja,
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
        {!isPelanggan && (
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
        <DetailHarga subTotal={subTotal} onReset={onReset} menuId={menuId} />
        <div className="flex justify-between px-2">
          <Text size="body" weight="semiBold">
            Total Harga
          </Text>
          <Text size="body" weight="semiBold">
            {formatRupiah({ value: finalTotal ?? 0 })}
          </Text>
        </div>
        {user?.role.name === "Kasir" && (
          <div className="bg-white p-2">
            <SelectLabel
              children="Pilih Metode Pembayaran"
              selectFormProps={{
                id: "payment_method",
                placeholder: "Pilih Metode Pembayaran",
                options: metodePembayaran,
              }}
              selectProps={{
                name: "payment_method",
                value: metodePembayaranSelected,
                onChange: handlePaymentMethodChange,
                getValue: (option) => option.value,
              }}
            ></SelectLabel>
          </div>
        )}

        <Button type="submit" className="mt-1">
          Pesan
        </Button>
      </form>
    </div>
  );
}
