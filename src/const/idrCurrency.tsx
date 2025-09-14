type CurrencyProps = {
    value: number;
}
const formatRupiah = ({ value }: CurrencyProps) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export { formatRupiah };