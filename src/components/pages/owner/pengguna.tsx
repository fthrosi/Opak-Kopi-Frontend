import { Text } from "@/components/atoms/text";
import { Input } from "@/components/atoms/inputForm";
import SearchIcon from "@/components/icons/search";
import AddIcon from "@/components/icons/add";
import ReusableTable from "@/components/atoms/table";
import ShieldIcon from "@/components/icons/shield";
import UsersIcon from "@/components/icons/users";
import { useState, useEffect } from "react";
import { fetchAllUsers, fetchCustomerStats } from "@/api/user";
import type { UserOwner, UserCustomer } from "@/types/user";
import { columnPenggunaOwner } from "@/components/organism/columnPengguna";
import { columnCustomerOwner } from "@/components/organism/columnCustomer";
import { useUIStore } from "@/components/store/useUIStore";
import { ModalConfirmation } from "@/components/organism/modalConfirmation";
import { updateStatusUser, deleteUser,createUser } from "@/api/user";
import { toast } from "sonner";
import Modal from "@/components/organism/modal";
import InputForm from "@/components/molecules/inputForm";
import { Button } from "@/components/atoms/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type createUserFormData } from "@/validateSchema/register";

export default function PenggunaOwnerPage() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }
  });
  const onSubmit = async (data: createUserFormData) => {
    try {
      
      await createUser(data);
      reset();
      fetchUsers();
      close();
      toast.success("Pengguna berhasil ditambahkan");
    } catch (error) {
      toast.error("Gagal menambahkan pengguna");
    }
  }
  const open = useUIStore((state) => state.open);
  const close = useUIStore((state) => state.close);
  const isStatus = useUIStore((state) => state.activeModal === "statusUser");
  const isHapus = useUIStore((state) => state.activeModal === "hapusUser");
  const isBlokir = useUIStore((state) => state.activeModal === "blokirUser");
  const isTambah = useUIStore((state) => state.activeModal === "tambahUser");
  const [userData, setUserData] = useState<UserOwner[]>([]);
  const [customerData, setCustomerData] = useState<UserCustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<UserCustomer | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<UserOwner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUser, setActiveUser] = useState("Kasir");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const fetchUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUserData(data.users);
    } catch (error) {
      toast.error("Gagal memuat pengguna");
    }
  };
  const fetchStats = async () => {
    try {
      const stats = await fetchCustomerStats();
      setCustomerData(stats.data);
    } catch (error) {
      toast.error("Gagal memuat pengguna");
    }
  };
  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);
  const handleStatusClick = (user: UserOwner) => {
    setSelectedUser(user);
    open("statusUser");
  };
  const handleHapusClick = (user: UserOwner) => {
    setSelectedUser(user);
    open("hapusUser");
  };
  const handleBlokirClick = (user: UserCustomer) => {
    setSelectedCustomer(user);
    open("blokirUser");
  };
  const columnCustomer = columnCustomerOwner({
    onBlokirClick: handleBlokirClick,
  });
  const columns = columnPenggunaOwner({
    onStatusClick: handleStatusClick,
    onHapusClick: handleHapusClick,
  });
  const handleTabClick = (role: string) => {
    setActiveUser(role);
    setSearchQuery("");
  };
  const filteredUsers = userData.filter((user) => {
    // ← FILTER BY ROLE FIRST
    const roleMatch = user.role?.name === activeUser;

    // ← THEN FILTER BY SEARCH QUERY
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchMatch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role?.name.toLowerCase().includes(query) ||
        user.status?.toLowerCase().includes(query);

      return roleMatch && searchMatch;
    }

    return roleMatch;
  });
  const handleStatusCustomer = async () => {
    if (!selectedCustomer) return;
    const newStatus =
      selectedCustomer.status === "Aktif" ? "Nonaktif" : "Aktif";
    try {
      await updateStatusUser(selectedCustomer.id, newStatus);
      fetchStats();
      close();
      setSelectedCustomer(null);
      toast.success(`Status pengguna berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      toast.error("Gagal mengubah status pengguna");
    }
  };
  const handleStatusManajemen = async () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === "Aktif" ? "Nonaktif" : "Aktif";
    try {
      await updateStatusUser(selectedUser.id, newStatus);
      fetchUsers();
      close();
      setSelectedUser(null);
      toast.success(`Status pengguna berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      toast.error("Gagal mengubah status pengguna");
    }
  };
  const deleteManajemen = async () => {
    if (!selectedUser) return;
    if (selectedUser.status === "Aktif") {
      toast.error("Nonaktifkan pengguna sebelum menghapusnya");
      return;
    }
    try {
      await deleteUser(Number(selectedUser.id));
      fetchUsers();
      close();
      setSelectedUser(null);
      toast.success("Pengguna berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus pengguna");
    }
  };
  const filteredCustomers = customerData.filter((user) => {
    // ← THEN FILTER BY SEARCH QUERY
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchMatch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      return searchMatch;
    }
    return true;
  });
  return (
    <section className="py-4 px-2 md:px-4 lg:px-8 xl:px-10 2xl:px-12 flex flex-col bg-broken min-h-full relative">
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex-shrink-0">
          <Text size="heading2" weight="semiBold">
            Pengguna
          </Text>
        </div>
        <div className="flex-shrink-0 flex gap-2 items-center">
          <div
            className={`flex p-2 rounded-md items-center ${
              activeUser === "Kasir" ? "bg-white" : "bg-primary"
            }`}
            onClick={() => handleTabClick("Kasir")}
          >
            <ShieldIcon
              className={`size-5 mr-1 ${
                activeUser === "Kasir" ? "text-primary" : "text-white"
              }`}
            />
            <Text
              size="body"
              weight="medium"
              className={`${
                activeUser === "Kasir" ? "text-primary" : "text-white"
              }`}
            >
              Manajemen
            </Text>
          </div>
          <div
            className={`flex items-center ${
              activeUser === "Pelanggan" ? "bg-white" : "bg-primary"
            } p-2 rounded-md`}
            onClick={() => handleTabClick("Pelanggan")}
          >
            <UsersIcon
              className={`size-6 ${
                activeUser === "Pelanggan" ? "text-primary" : "text-white"
              } mr-1`}
            />
            <Text
              size="body"
              weight="medium"
              className={`${
                activeUser === "Pelanggan" ? "text-primary" : "text-white"
              }`}
            >
              Pengguna
            </Text>
          </div>
        </div>
        <div className="flex-shrink-0 flex justify-between items-center">
          <div className="flex gap-1">
            <Input
              placeholder="Cari Pengguna"
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
          {activeUser === "Kasir" && (
            <div
              className="flex gap-1 p-2 bg-white items-center rounded-sm hover:cursor-pointer hover:bg-gray-50"
              onClick={() => open("tambahUser")}
            >
              <AddIcon className="cursor-pointer size-3 text-primary" />
              <Text size="caption">Tambah Manajemen</Text>
            </div>
          )}
        </div>
        <div className="flex-1">
          {activeUser === "Kasir" ? (
            <ReusableTable
              columns={columns}
              data={filteredUsers}
              emptyMessage="Tidak ada pengguna"
              getRowId={(row) => row.id}
              rowsPerPageOptions={[5, 10, 25]}
              defaultRowsPerPage={10}
              maxHeight="100%"
            />
          ) : (
            <ReusableTable
              columns={columnCustomer}
              data={filteredCustomers}
              emptyMessage="Tidak ada Customer"
              getRowId={(row) => row.id}
              rowsPerPageOptions={[5, 10, 25]}
              defaultRowsPerPage={10}
              maxHeight="100%"
            />
          )}
        </div>
      </div>
      {isStatus && (
        <ModalConfirmation
          title={`${
            selectedUser?.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"
          } Pengguna`}
          message={`Apakah Anda yakin ingin ${
            selectedUser?.status === "Aktif" ? "menonaktifkan" : "mengaktifkan"
          } ${selectedUser?.name || ""}?`}
          onClose={() => {
            close();
            setSelectedUser(null);
          }}
          onConfirm={() => {
            handleStatusManajemen();
            close();
            setSelectedUser(null);
          }}
        />
      )}
      {isHapus && (
        <ModalConfirmation
          title="Hapus Pengguna"
          message={`Apakah Anda yakin ingin menghapus ${
            selectedUser?.name || ""
          }?`}
          onClose={() => {
            close();
            setSelectedUser(null);
          }}
          onConfirm={() => {
            deleteManajemen();
            close();
            setSelectedUser(null);
          }}
        />
      )}
      {isBlokir && (
        <ModalConfirmation
          title={`Blokir Pengguna`}
          message={`Apakah Anda yakin ingin memblokir ${
            selectedCustomer?.name || ""
          }? Pengguna yang diblokir tidak dapat melakukan transaksi.`}
          onClose={() => {
            close();
            setSelectedCustomer(null);
          }}
          onConfirm={() => {
            handleStatusCustomer();
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
          modalClassName="max-w-[40rem] max-h-[40rem] overflow-y-auto pt-12"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <InputForm
                  children="Nama"
                  inputId="name"
                  inputProps={{
                      ...register("name"),
                    placeholder: "Masukkan nama",
                  }}
                />
                 {errors.name && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.name.message}
                </Text>
              )}
              </div>
              <div className="w-full">
                <InputForm
                  children="Email"
                  inputId="email"
                  inputProps={{
                    ...register("email"),
                    placeholder: "Masukkan email",
                  }}
                />
                 {errors.email && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.email.message}
                </Text>
              )}
              </div>
              <div className="w-full">
                <InputForm
                  children="Nomor Telepon"
                  inputId="phone"
                  inputProps={{
                    ...register("phone"),
                    placeholder: "Masukkan nomor telepon",
                  }}
                />
                 {errors.phone && (
                <Text size="caption" className="text-red-500 mt-1">
                  {errors.phone.message}
                </Text>
              )}
              </div>
              <div className="flex w-full justify-between gap-2 mt-4">
                <Button
                  type="button"
                  className="bg-red-600 text-xs sm:text-base flex-1"
                  onClick={() => close()}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-xs sm:text-base flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menambah..." : "Tambah Promo"}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
