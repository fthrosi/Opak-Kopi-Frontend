import { Text } from "../atoms/text";
import { formatRupiah } from "@/const/idrCurrency";
import PlusIcon from "../icons/plus";
import MinusIcon from "../icons/minus";
import type { CartItem } from "@/components/store/cart";

interface Props {
    item: CartItem;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
}

export default function CartItemComponent({ item, addToCart, removeFromCart }: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <img src={item.imageSrc} alt="produk" className="size-13 rounded-lg" />
        <div className="flex flex-col">
          <Text
            size="caption"
            weight="semiBold"
            className="text-secondary lg:text-[0.7rem]"
          >
            {item.nama}
          </Text>
          <Text size="caption" className="text-secondary lg:text-[0.7rem]">
            {formatRupiah({ value: item.harga })}
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-primary p-1 rounded-full hover:cursor-pointer"
        >
          <MinusIcon className="size-2 text-broken" />
        </button>
        <Text>{item.qty}</Text>
        <button
          onClick={() => addToCart(item)}
          className="bg-primary p-1 rounded-full hover:cursor-pointer"
        >
          <PlusIcon className="size-2 text-broken" />
        </button>
      </div>
    </div>
  );
}
