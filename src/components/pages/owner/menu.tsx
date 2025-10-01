import { Text } from "@/components/atoms/text";
import SearchComponent from "@/components/organism/componentSearch";
import { menuStatus } from "@/const/statusMenu";
import { useState, useEffect, useMemo } from "react";
import ReusableTable from "@/components/atoms/table";
import { columnMenuOwner } from "@/components/organism/columnMenuOwner";
import type { MenuProps } from "@/types/menu";
import { useUIStore } from "@/components/store/useUIStore";
import { fetchKategoriMenu } from "@/api/kategoriMenu";
import { deleteMenu, fetchMenu } from "@/api/menu";
import type { kategoriMenu } from "@/types/kategoriMenu";
import { toast } from "sonner";
import { ModalConfirmation } from "@/components/organism/modalConfirmation";
import ModalEditMenu from "@/components/organism/modalEditMenu";
import AddIcon from "@/components/icons/add";
import ModalTambahMenu from "@/components/organism/modalTambahMenu";

export default function MenuOwnerPage() {
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isEdit = useUIStore((state) => state.activeModal === "editMenu");
  const isHapus = useUIStore((state) => state.activeModal === "hapusMenu");
  const isTambah = useUIStore((state) => state.activeModal === "tambahMenu");

  const [activeStatus, setActiveStatus] = useState<string>("");
  const [menuData, setMenuData] = useState<MenuProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriMenu, setKategoriMenu] = useState<kategoriMenu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<MenuProps | null>(null);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setActiveStatus(status);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredMenu = useMemo(() => {
    let filtered = menuData;

    if (activeStatus) {
      filtered = filtered.filter(
        (menu) => menu.status.toLowerCase() === activeStatus.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (menu) =>
          menu.name?.toLowerCase().includes(query) ||
          menu.category?.name?.toLowerCase().includes(query) ||
          menu.status?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [menuData, activeStatus, searchQuery]);

  const getMenu = async () => {
    try {
      const data = await fetchMenu();
      setMenuData(data.data);
      setActiveStatus("");
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getKategoriMenu = async () => {
    try {
      const data = await fetchKategoriMenu();
      console.log(data);
      setKategoriMenu(data.data);
    } catch (error) {
      console.error("Error fetching kategori menu:", error);
    }
  };
  useEffect(() => {
    getMenu();
    getKategoriMenu();
  }, []);
  const handlemodalEdit = (menu: MenuProps) => {
    setSelectedMenu(menu);
    open("editMenu");
  };
  const handlemodalHapus = (menu: MenuProps) => {
    setSelectedMenu(menu);
    open("hapusMenu");
  };
  const processedMenu = useMemo(() => {
    return filteredMenu.map((menu) => {
      return {
        ...menu,
        profit: menu.current_price - menu.current_cogs,
      };
    });
  }, [filteredMenu]);
  const columns = columnMenuOwner({
    onEditClick: handlemodalEdit,
    onHapusClick: handlemodalHapus,
  });

  const handleHapus = async () => {
    try {
      await deleteMenu(selectedMenu!.id);
      await getMenu();
      handleCloseModal();
      toast.success("Menu berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Gagal menghapus menu!");
    }
  };
  const handleCloseModal = () => {
    close();
    setSelectedMenu(null);
  };
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex w-full justify-between items-center">
          <Text size="heading2" weight="semiBold">
            Manajemen Menu
          </Text>
          <div className="flex gap-1 p-1 bg-white items-center rounded-sm hover:cursor-pointer hover:bg-gray-50" onClick={() => open("tambahMenu")}>
            <AddIcon
              className="cursor-pointer size-3 text-primary"
            />
            <Text size="caption">Tambah Menu</Text>
          </div>
        </div>

        <SearchComponent
          statusReservasi={menuStatus}
          activeStatus={activeStatus}
          onStatusChange={(e) => handleStatusChange(e)}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchChange(e)}
          isDateDisabled={true}
        />
        <ReusableTable
          columns={columns}
          data={processedMenu}
          emptyMessage="Tidak ada menu"
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          maxHeight="100%"
        />
      </div>
      {isEdit && (
        <ModalEditMenu
          menu={selectedMenu}
          kategoriMenu={kategoriMenu}
          onClose={handleCloseModal}
          onSuccess={getMenu}
        />
      )}
      {isHapus && (
        <ModalConfirmation
          title="Hapus Menu"
          message={`Apakah Anda yakin ingin menghapus menu "${selectedMenu?.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={handleCloseModal}
          onConfirm={handleHapus}
        />
      )}
      {isTambah && (
        <ModalTambahMenu
          kategoriMenu={kategoriMenu}
          onClose={handleCloseModal}
          onSuccess={getMenu}
        />
      )}
    </section>
  );
}
