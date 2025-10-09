import { Text } from "@/components/atoms/text";
import SearchComponent from "@/components/organism/componentSearch";
import { useState, useEffect, useMemo } from "react";
import type { Dayjs } from "dayjs";
import InformationsCard from "@/components/organism/informationsCard";
import ReusableTable from "@/components/atoms/table";
import { columnPromoOwner } from "@/components/organism/columnPromo";
import { useUIStore } from "@/components/store/useUIStore";
import { toast } from "sonner";
import type { promoType } from "@/types/promoType";
import { getPromoAllWithCount } from "@/api/promo";
import AddIcon from "@/components/icons/add";
import { promoStatus } from "@/const/statusPromo";
import Tags from "@/components/icons/tags";
import Megaphone from "@/components/icons/megaphone";
import VoucherIcon from "@/components/icons/voucher";
import ModalEditPromo from "@/components/organism/modalEditPromo";
import { fetchMenu } from "@/api/menu";
import type { MenuProps } from "@/types/menu";
import { ModalConfirmation } from "@/components/organism/modalConfirmation";
import { updatePromoStatus,deletePromo } from "@/api/promo";
import ModalTambahPromo from "@/components/organism/modalTambahPromo";

export default function PromoOwnerPage() {
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isEdit = useUIStore((state) => state.activeModal === "editPromo");
  const isStatus = useUIStore((state) => state.activeModal === "statusPromo");
  const isHapus = useUIStore((state) => state.activeModal === "hapusPromo");
  const isTambah = useUIStore((state) => state.activeModal === "tambahPromo");
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [promoData, setPromoData] = useState<promoType[]>([]);
  const [menuData, setMenuData] = useState<MenuProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<promoType | null>(null);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setActiveStatus(status);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredPromo = useMemo(() => {
    let filtered = promoData;

    if (activeStatus) {
      filtered = filtered.filter(
        (promo) => promo.status.toLowerCase() === activeStatus.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (promo) =>
          promo.promo_code?.toLowerCase().includes(query) ||
          promo.name?.toLowerCase().includes(query) ||
          promo.status?.toLowerCase().includes(query)
      );
    }

    // Filter tanggal hanya pakai startDate & endDate (bukan input)
    if (startDate) {
      filtered = filtered.filter((promo) => {
        const promoStart = promo.start_date.split("T")[0];
        return promoStart >= startDate.format("YYYY-MM-DD");
      });
    }
    if (endDate) {
      filtered = filtered.filter((promo) => {
        const promoEnd = promo.end_date.split("T")[0];
        return promoEnd <= endDate.format("YYYY-MM-DD");
      });
    }

    return filtered;
  }, [promoData, activeStatus, searchQuery, startDate, endDate]);

  const getMenu = async () => {
    try {
      const data = await fetchMenu();
      setMenuData(data.data);
    } catch (error) {
      toast.error("Gagal memuat menu");
    }
  };
  const fetchPromo = async () => {
    try {
      const data = await getPromoAllWithCount();
      setPromoData(data.data);
      setActiveStatus("");
      setSearchQuery("");
    } catch (error) {
      toast.error("Gagal memuat promo");
    }
  };
  const promoStats = useMemo(() => {
    return {
      total: promoData?.length,
      active: promoData?.filter((promo) => promo.status === "Aktif").length,
      claimed: promoData?.reduce(
        (sum, promo) => sum + (promo._count.orders ?? 0),
        0
      ),
    };
  }, [promoData]);
  useEffect(() => {
    fetchPromo();
    getMenu();
  }, []);

  const handleEditStatus = async () => {
    if (!selectedPromo) return;
    try {
      const newStatus =
        selectedPromo.status === "Aktif" ? "Tidak Aktif" : "Aktif";
      await updatePromoStatus(selectedPromo.id, newStatus);
      toast.success(`Status promo diubah menjadi ${newStatus}`);
      close();
      fetchPromo();
    } catch (error) {
      toast.error("Gagal mengubah status promo");
    }
  };
  const handleHapus = async () => {
    if (!selectedPromo) return;
    try {
      await deletePromo(selectedPromo.id);
      toast.success("Promo berhasil dihapus");
      close();
      fetchPromo();
    }
    catch (error) {
      toast.error("Gagal menghapus promo");
    }
  };
  const handlemodalEdit = (promo: promoType) => {
    setSelectedPromo(promo);
    open("editPromo");
  };
  const handlemodalStatus = (promo: promoType) => {
    setSelectedPromo(promo);
    open("statusPromo");
  };
  const handlemodalHapus = (promo: promoType) => {
    setSelectedPromo(promo);
    open("hapusPromo");
  };
  const handleAdd = () => {
    open("tambahPromo");
  };
  const processedPromo = useMemo(() => {
    return filteredPromo.map((promo) => {
      return {
        ...promo,
        periode:
          promo.start_date.split("T")[0] + " - " + promo.end_date.split("T")[0],
      };
    });
  }, [filteredPromo]);
  const columns = columnPromoOwner({
    onEditClick: handlemodalEdit,
    onHapusClick: handlemodalHapus,
    onStatusClick: handlemodalStatus,
  });
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken h-full relative">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex justify-between items-center">
          <Text size="heading2" weight="semiBold">
            Promo
          </Text>
          <div
            className="flex gap-1 p-1 bg-white items-center rounded-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={handleAdd}
          >
            <AddIcon className="cursor-pointer size-3 text-primary" />
            <Text size="caption">Tambah Promo</Text>
          </div>
        </div>

        <SearchComponent
          statusReservasi={promoStatus}
          activeStatus={activeStatus}
          onStatusChange={(e) => handleStatusChange(e)}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchChange(e)}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => setStartDate(date)}
          onEndDateChange={(date) => setEndDate(date)}
          isdisableFuture={false}
        />
        <InformationsCard
          items={[
            {
              title: "Total Promo",
              count: promoStats.total ? promoStats.total.toString() : "0",
              variant: "white",
              titleClassName: "",
              icon: <Tags className="size-4 text-primary mr-2" />,
            },
            {
              title: "Promo Aktif",
              count: promoStats.active ? promoStats.active.toString() : "0",
              variant: "secondary",
              titleClassName: "text-white",
              numberClassName: "text-white",
              icon: <Megaphone className="size-4 text-white mr-2" />,
            },
            {
              title: "Total Klaim",
              count: promoStats?.claimed ? promoStats.claimed.toString() : "0",
              variant: "primary",
              titleClassName: "text-secondary",
              numberClassName: "text-secondary",
              icon: <VoucherIcon className="size-4 text-secondary mr-2" />,
            },
          ]}
        />
        <ReusableTable
          columns={columns}
          data={processedPromo}
          emptyMessage="Tidak ada reservasi"
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={10}
          maxHeight="100%"
        />
      </div>
      {isEdit && selectedPromo && (
        <ModalEditPromo
          menus={menuData}
          promo={selectedPromo}
          onClose={close}
          onSuccess={() => {
            fetchPromo();
          }}
        />
      )}
      {isStatus && selectedPromo && (
        <ModalConfirmation
          title="Ubah Status Promo"
          message={`Apakah Anda yakin ingin mengubah status promo "${selectedPromo.name}"?`}
          onClose={close}
          onConfirm={handleEditStatus}
        />
      )}
      {isHapus && selectedPromo && (
        <ModalConfirmation
          title="Hapus Promo"
          message={`Apakah Anda yakin ingin menghapus promo "${selectedPromo.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onClose={close}
          onConfirm={handleHapus}
        />
      )}
      {isTambah && (
        <ModalTambahPromo
          isOpen={isTambah}
          onClose={close}
          onSuccess={() => {
            fetchPromo();
          }}
          menus={menuData}
        />
      )}
    </section>
  );
}
