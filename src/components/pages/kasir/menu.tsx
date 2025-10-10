import { updateMenuStatus } from "@/api/menu";
import { useEffect, useState } from "react";
import MenuFilterBar from "@/components/organism/menuFilterBar";
import { useMenu } from "@/components/store/useMenu";
import type { MenuProps } from "@/types/menu";
import { Text } from "@/components/atoms/text";
import CardMenu from "@/components/organism/cardMenu";
import { toast } from "sonner";
export default function KasirMenuPage() {
  const { listMenu, fetchMenuData } = useMenu();
  const [filteredMenu, setFilteredMenu] = useState<MenuProps[]>([]);

  const updateStatus = async (menu: MenuProps) => {
    let newStatus = ""
    if(menu.status === "Tersedia"){
      newStatus = "Habis"
    }else {
      newStatus = "Tersedia"
    }
    try {
      await updateMenuStatus(menu.id, {
        status: newStatus
      });
      toast.success(`Status menu ${menu.name} berhasil diubah menjadi ${newStatus}`);
      await fetchMenuData();
    } catch (error) {
      toast.error(`Gagal mengubah status menu ${menu.name}`);
    }
  };
  const handleChangeStatus = (item : MenuProps) => {
    updateStatus(item);
  }
  useEffect(() => {
    fetchMenuData();
  }, []);
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full">
      <div className="flex flex-col gap-8 h-full ">
        <MenuFilterBar onFilter={setFilteredMenu} menuList={listMenu} />
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="justify-items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {(filteredMenu.length ? filteredMenu : listMenu).map((item) => (
              <CardMenu
                key={item.id}
                onClick={() => handleChangeStatus(item)}
                children={item.status === "Tersedia" ? "Tersedia" : "Habis"}
                imageSrc={item.image_url}
                price={item.current_price}
                status={item.status}
                contentClassName="flex flex-col justify-between px-[clamp(0.5rem,2.3vw,0.75rem)] py-[clamp(0.5rem,2.7vw,0.9rem)] sm:py-[0.8rem] md:py-[1.2rem] lg:py-[0.9rem]"
                titleProps={{
                  className: "flex-row justify-between items-center",
                  title: item.name,
                  titleClassName:
                    "text-[clamp(0.6rem,2.6vw,0.9rem)] sm:text-[clamp(0.8rem,1.9vw,0.9rem)] lg:text-[clamp(0.7rem,1.1vw,1rem)] xl:text-[1rem] 2xl:text-[1.2rem] text-wrap",
                  titleSize: "custom",
                  titleWidth: "custom",
                  titleWeight: "semiBold",
                  titleColor: "secondary",
                  children: (
                    <Text className="text-[clamp(0.55rem,2.4vw,0.8rem)] 2xl:text-base">
                      ID:#{item.id}
                    </Text>
                  ),
                }}
                buttonProps={{
                  size: "custom",
                  className: `px-3 py-1 2xl:py-2 text-xs 2xl:text-sm w-full ${item.status === "Tersedia" ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"} text-white`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
