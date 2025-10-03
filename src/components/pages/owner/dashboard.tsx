import { Text } from "@/components/atoms/text";
import MenuDashboard from "@/components/icons/menuDashhboard";
import { useState, useEffect } from "react";
import type {
  DashhboardSumary,
  MountlyIncome,
  topMenu,
  menu,
} from "@/types/dashboard";
import { fetchDashboardStats } from "@/api/dashboard";
import UsersDashboard from "@/components/icons/usersDashboard";
import PesananDashboard from "@/components/icons/pesananDashhboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SelectLabel from "@/components/molecules/selectLabel";
import { columnBestProduct } from "@/components/organism/columnbestproduct";
import ReusableTable from "@/components/atoms/table";
import { toast } from "sonner";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashhboardSumary | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState<MountlyIncome[]>([]);
  const [topMenusByCategory, setTopMenusByCategory] = useState<topMenu[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [menuItems, setMenuItems] = useState<menu[]>([]);

  const handleFecthDashboardStats = async () => {
    try {
      const data = await fetchDashboardStats();
      console.log("Dashboard Stats:", data);
      setSummary(data.data.summary);
      setMonthlyIncome(data.data.monthlyRevenue);
      setTopMenusByCategory(data.data.topMenusByCategory);
      if (data.data.topMenusByCategory.length > 0) {
        setSelectedCategoryId(data.data.topMenusByCategory[0].categoryId);
        setMenuItems(data.data.topMenusByCategory[0].topMenus || []);
      }
    } catch (error) {
      toast.error("Gagal memuat data dashboard");
    }
  };
  useEffect(() => {
    handleFecthDashboardStats();
  }, []);
  const option = topMenusByCategory.map((category) => ({
    label: category.categoryName,
    value: category.categoryId,
  }));
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategoryId(categoryId);

    // Find selected category and update menu items
    const selectedCategory = topMenusByCategory.find(
      (category) => category.categoryId === categoryId
    );

    if (selectedCategory) {
      setMenuItems(selectedCategory.topMenus || []);
    } else {
      setMenuItems([]);
    }
  };
  console.table(option);
  console.log(selectedCategoryId);
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <Text size="heading2" weight="semiBold">
          Dashboard
        </Text>
        <div className="flex flex-col xs:flex-row flex-shrink-0 gap-4 justify-between items-center">
          <div className="bg-white flex items-center p-4 gap-4 rounded-lg shadow-md w-full xs:w-40 md:w-65">
            <MenuDashboard className="size-10 lg:size-8 md:size-15 text-primary" />
            <div className="flex flex-col gap-1">
              <Text size="heading2" weight="bold" className="lg:text-[1rem]">
                {summary ? summary.totalMenus : 0}
              </Text>
              <Text size="body" className="lg:text-[0.9rem]">
                Total Menu
              </Text>
            </div>
          </div>
          <div className="bg-white flex items-center p-4 gap-4 rounded-lg shadow-md w-full xs:w-40 md:w-65">
            <UsersDashboard className="size-10 lg:size-8 md:size-15 text-primary" />
            <div className="flex flex-col gap-1">
              <Text size="heading2" weight="bold" className="lg:text-[1rem]">
                {summary ? summary.totalCustomers : 0}
              </Text>
              <Text size="body" className="lg:text-[0.9rem]">
                Total Customers
              </Text>
            </div>
          </div>
          <div className="bg-white flex items-center p-4 gap-4 rounded-lg shadow-md w-full xs:w-40 md:w-65">
            <PesananDashboard className="size-10 lg:size-10 md:size-15 text-primary" />
            <div className="flex flex-col gap-1">
              <Text size="heading2" weight="bold" className="lg:text-[1.2rem]">
                {summary ? summary.totalOrders : 0}
              </Text>
              <Text size="body" className="lg:text-[1rem]">
                Total Orders
              </Text>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-full h-60 lg:h-60 xl:h-90 bg-white rounded-2xl shadow px-4 py-4 mt-1">
          <ResponsiveContainer>
            <LineChart
              data={monthlyIncome}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#9b5a26" />
              <XAxis dataKey="month" />
              <YAxis
                domain={[1000000, 5000000]} // batas min 1jt, max 5jt
                tickFormatter={(v) => `Rp${v / 1000000}jt`}
              />
              <Tooltip formatter={(v) => `Rp${v.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#de962d"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg  flex flex-col  gap-5 flex-1 min-h-0">
          <div className="flex-shrink-0">
            <SelectLabel
              children="Menu Penjualan Terbanyak"
              selectFormProps={{
                className: "w-50",
                options: option,
                id: "kategoriMenu",
              }}
              selectProps={{
                value: selectedCategoryId || "",
                onChange: handleCategoryChange,
                getValue: (option) => option.value,
                getLabel: (option) => option.label,
              }}
            />
          </div>
          <div className="flex-1 ">
            <ReusableTable
              columns={columnBestProduct()}
              data={menuItems}
              emptyMessage="Tidak ada menu"
              getRowId={(row) => row.id}
              rowsPerPageOptions={[5, 10, 25]}
              defaultRowsPerPage={10}
              maxHeight="100%"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
