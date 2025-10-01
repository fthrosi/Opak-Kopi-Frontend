import { Input } from "@/components/atoms/inputForm";
import SearchIcon from "@/components/icons/search";
import AddIcon from "@/components/icons/add";
import ReusableTable from "@/components/atoms/table";
import {
  findAllWithCount,
  updateKategoriMenu,
  deleteKategoriMenu,
  createKategoriMenu,
} from "@/api/kategoriMenu";
import { Text } from "@/components/atoms/text";
import { columnKategoriMenuOwner } from "@/components/organism/columnKategoiMenu";
import { useState, useEffect, useMemo } from "react";
import type { kategoriMenu } from "@/types/kategoriMenu";
import { useUIStore } from "@/components/store/useUIStore";
import Modal from "@/components/organism/modal";
import InputForm from "@/components/molecules/inputForm";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";
import { ModalConfirmation } from "@/components/organism/modalConfirmation";

export default function KategoriMenuOwnerPage() {
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isHapus = useUIStore(
    (state) => state.activeModal === "hapusKategoriMenu"
  );
  const isTambah = useUIStore(
    (state) => state.activeModal === "tambahKategoriMenu"
  );
  const isEdit = useUIStore(
    (state) => state.activeModal === "editKategoriMenu"
  );

  const [kategoriMenuData, setKategoriMenuData] = useState<kategoriMenu[]>([]);
  const [namaKategori, setNamaKategori] = useState("");
  const [selectedKategoriMenu, setSelectedKategoriMenu] =
    useState<kategoriMenu | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredKategoriMenu = useMemo(() => {
    let filtered = kategoriMenuData;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (menu) =>
          menu.name?.toLowerCase().includes(query) ||
          menu._count.menus?.toString().toLowerCase().includes(query) ||
          menu.id?.toString().toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [kategoriMenuData, searchQuery]);

  const getKategoriMenu = async () => {
    try {
      const response = await findAllWithCount();
      setKategoriMenuData(response.data);
    } catch (error) {
      console.error("Error fetching kategori menu:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKategoriMenu) return;
    setIsSubmitting(true);
    try {
      await updateKategoriMenu(
        selectedKategoriMenu.id,
        selectedKategoriMenu.name
      );
      setIsSubmitting(false);
      close();
      getKategoriMenu();
      toast.success("Kategori menu berhasil diperbarui");
    } catch (error) {
      console.error("Error updating kategori menu:", error);
      setIsSubmitting(false);
      toast.error("Gagal memperbarui kategori menu");
    }
  };
  const handleHapus = async () => {
    if (!selectedKategoriMenu) return;
    setIsSubmitting(true);
    try {
      await deleteKategoriMenu(selectedKategoriMenu.id);
      setIsSubmitting(false);
      close();
      getKategoriMenu();
      toast.success("Kategori menu berhasil dihapus");
    } catch (error: any) {
      console.error("Error deleting kategori menu:", error);
      setIsSubmitting(false);
      toast.error(error);
      close();
    }
  };
  const handleSubmitTambah = async (e: React.FormEvent) => {
    if (!namaKategori.trim()) {
      toast.error("Nama kategori wajib diisi");
      return;
    }
    e.preventDefault();
    setIsSubmitting(true);
    console.log(namaKategori);
    try {
        await createKategoriMenu(
            namaKategori
        );
        setIsSubmitting(false);
        close();
        getKategoriMenu();
        setNamaKategori("");
        toast.success("Kategori menu berhasil ditambahkan");
    }
    catch (error) {
        console.error("Error adding kategori menu:", error);
        setIsSubmitting(false);
        setNamaKategori("");
        toast.error("Gagal menambahkan kategori menu");
    }
  };

  useEffect(() => {
    getKategoriMenu();
  }, []);
  const handleTambahKategori = () => {
    open("tambahKategoriMenu");
  };
  const handleClickEdit = (kategori: kategoriMenu) => {
    open("editKategoriMenu");
    setSelectedKategoriMenu(kategori);
  };
  const handleClickDelete = (kategori: kategoriMenu) => {
    open("hapusKategoriMenu");
    setSelectedKategoriMenu(kategori);
  };
  const handleClose = () => {
    close();
    setSelectedKategoriMenu(null);
    setNamaKategori("");
  };
  const columns = columnKategoriMenuOwner({
    onEditClick: handleClickEdit,
    onHapusClick: handleClickDelete,
  });
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken min-h-full relative">
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex-shrink-0">
          <Text size="heading2" weight="semiBold">
            Kategori Menu
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Input
              placeholder="Cari Pesanan"
              bgColor="white"
              borderColor="white"
              className="w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="flex justify-center items-center bg-secondary hover:bg-secondary/80 rounded-md p-2">
              <SearchIcon className="w-4 h-4 text-white" />
            </div>
          </div>
          <div
            className="flex gap-1 p-2 bg-white items-center rounded-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={handleTambahKategori}
          >
            <AddIcon className="cursor-pointer size-3 text-primary" />
            <Text size="caption">Tambah Kategori</Text>
          </div>
        </div>
        <ReusableTable
          columns={columns}
          data={filteredKategoriMenu}
          emptyMessage="Tidak ada kategori"
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          maxHeight="100%"
        />
      </div>
      {isEdit && (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          background="white"
          padding="default"
          rounded="default"
          modalClassName="max-w-[20rem] max-h-[20rem] overflow-y-auto pt-12"
        >
          <div className="flex flex-col gap-3">
            <InputForm
              children="Nama Kategori"
              inputId="namaKategori"
              inputVariant="text"
              inputProps={{
                placeholder: "Masukkan nama kategori",
                value: selectedKategoriMenu?.name || "",
                onChange: (e) =>
                  setSelectedKategoriMenu((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  ),
              }}
            />
            <div className="flex w-full justify-between gap-2 mt-4">
              <Button
                type="button"
                className="bg-red-600 text-xs sm:text-base flex-1"
                onClick={handleClose}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-primary text-xs sm:text-base flex-1"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isHapus && (
        <ModalConfirmation
          title="Hapus Kategori Menu"
          message={`Apakah Anda yakin ingin menghapus kategori menu "${selectedKategoriMenu?.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={handleClose}
          onConfirm={() => {
            handleHapus();
          }}
        />
      )}
      {isTambah && (
        <Modal
          position="center"
          paddingWrapper="default"
          size="full"
          background="white"
          padding="default"
          rounded="default"
          modalClassName="max-w-[20rem] max-h-[20rem] overflow-y-auto pt-12"
        >
          <div className="flex flex-col gap-3">
            <InputForm
              children="Nama Kategori"
              inputId="namaKategori"
              inputVariant="text"
              inputProps={{
                placeholder: "Masukkan nama kategori",
                value: namaKategori,
                onChange: (e) => setNamaKategori(e.target.value),
              }}
            />
            <div className="flex w-full justify-between gap-2 mt-4">
              <Button
                type="button"
                className="bg-red-600 text-xs sm:text-base flex-1"
                onClick={handleClose}
              >
                Batal
              </Button>
              <Button
                type="button"
                className="bg-primary text-xs sm:text-base flex-1"
                disabled={isSubmitting}
                onClick={handleSubmitTambah}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
