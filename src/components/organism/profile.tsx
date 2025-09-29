import { useState } from "react";
import { Pages } from "../atoms/page";
import TitleDescription from "../molecules/titleDescription";
import useAuthStore from "../store/useAuthStore";
import { imgDetail } from "@/const/user";
import {
  updateDataUser,
  updateUserProfilePicture,
  updateDataEmail,
  changeUserPassword,
} from "@/api/user";
import { toast } from "sonner";
import { useUIStore, type modalKey } from "../store/useUIStore";
import { ModalProfilePicture } from "./modalProfilePicture";
import { buttonProfile } from "@/const/constButton";
import {
  fieldModalEditUser,
  fieldModalEditEmail,
  fieldModalEditPassword,
} from "@/const/user";
import { ModalEditUser } from "./modalEditUser";
import ProfileComponent from "./profileComponent";

export default function Profile() {
  const fieldToShow = [
    {
      id: "name",
      label: "Nama",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "phone",
      label: "No. Handphone",
    },
    {
      id: "poin",
      label: "Poin",
    },
  ];
  const updateUser = useAuthStore((state) => state.updateUserData);
  const userActive = useAuthStore((state) => state.user);
  const handleUpdateProfilePicture = async (file: File | null) => {
    if (file) {
      const formDataWithFile = new FormData();
      formDataWithFile.append("image", file);
      console.log("FormData contents:");
      formDataWithFile.forEach((value, key) => {
        console.log(key, value);
      });
      try {
        const user = await updateUserProfilePicture(formDataWithFile);
        updateUser(user.data);
        console.log("Updated user:", user);
        toast.success("User updated successfully");
        closeModal();
        setSelectedFile(null);
        setPreview("");
        closeModal();
      } catch (error) {
        toast.error("Failed to update user");
        closeModal();
      }
    }
  };
  const profileData = useAuthStore((state) => state.user);
  const openModal = useUIStore((state) => state.open);
  const closeModal = useUIStore((state) => state.close);
  const isopenModalProfilePicture = useUIStore(
    (state) => state.activeModal === "profilePicture"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>("");
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  const [formData, setFormData] = useState<Record<string, string>>({});
  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const getCurrentFields = () => {
    switch (activeModal) {
      case "editUser":
        return fieldModalEditUser;
      case "editEmail":
        return fieldModalEditEmail;
      case "editPassword":
        return fieldModalEditPassword;
      default:
        return [];
    }
  };
  const handleUpdate = async () => {
    try {
      let user;
      if (activeModal === "editEmail") {
        if (formData["email"] === profileData?.email) {
          toast.error("Email tidak berubah");
          return;
        }
        if (!formData["password"]) {
          toast.error("Password harus diisi untuk mengubah email");
          return;
        }
        const emailData = {
          email: formData["email"],
          password: formData["password"],
        };
        user = await updateDataEmail(emailData);
        toast.success("Email updated successfully");
      } else if (activeModal === "editUser") {
        user = await updateDataUser(formData);
        console.log("Updated user:", user);
        toast.success("User updated successfully");
      } else if (activeModal === "editPassword") {
        if (formData["newPassword"] !== formData["confirmNewPassword"]) {
          toast.error("New password and confirm password do not match");
          return;
        }
        if (!formData["password"]) {
          toast.error("Current password is required to change password");
          return;
        }
        const passwordData = {
          currentPassword: formData["password"],
          newPassword: formData["newPassword"],
        };
        user = await changeUserPassword(passwordData);
        toast.success("Password updated successfully");
      }
      closeModal();
      setActiveModal("");
      updateUser(user.data);
      setFormData({});
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
      closeModal();
    }
  };
  const [activeModal, setActiveModal] = useState<modalKey | "">("");
  const isModalActive = useUIStore(
    (state) => state.activeModal === activeModal
  );
  const handleOpenModal = (modal: modalKey) => {
    openModal(modal);
    setActiveModal(modal);
    const initialFormData: Record<string, string> = {};
    if (modal === "editUser") {
      initialFormData.name = profileData?.name || "";
      initialFormData.phone = profileData?.phone || "";
    } else if (modal === "editEmail") {
      initialFormData.email = profileData?.email || "";
      initialFormData.currentPassword = ""; // Password selalu kosong
    } else if (modal === "editPassword") {
      initialFormData.currentPassword = "";
      initialFormData.newPassword = "";
      initialFormData.confirmNewPassword = "";
    }
    setFormData(initialFormData);
  };
  const handleButtonProfileClick = (buttonTitle: string) => {
    handleOpenModal(buttonTitle as modalKey);
  };
  return (
    <Pages
      className={`flex flex-col pt-5 ${
        userActive?.role === "Pelanggan" ? "flex-1" : "h-full"
      }`}
    >
      {userActive?.role === "Pelanggan" ? (
        <div className="xs:bg-white xs:p-4 xs:rounded-lg ">
          <TitleDescription
            title="Profile Page"
            titleSize="heading3"
            titleWeight="semiBold"
            description="Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun"
            descriptionSize="caption"
            gap="profile"
            descriptionPosition="left"
            className="border-b-1 border-b-primary pb-2"
          />
          <ProfileComponent
            profileData={profileData}
            fieldToShow={fieldToShow}
            imgDetail={imgDetail}
            buttonProfile={buttonProfile}
            onButtonImageClick={() => openModal("profilePicture")}
            onButtonProfileClick={handleButtonProfileClick}
          />
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-shrink-0 xs:bg-white xs:px-4 xs:pt-4">
            <TitleDescription
              title="Profile Page"
              titleSize="heading3"
              titleWeight="semiBold"
              description="Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun"
              descriptionSize="caption"
              gap="profile"
              descriptionPosition="left"
              className="border-b-1 border-b-primary pb-2"
            />
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide xs:bg-white xs:px-4 xs:pb-4">
            <ProfileComponent
              profileData={profileData}
              fieldToShow={fieldToShow}
              imgDetail={imgDetail}
              buttonProfile={buttonProfile}
              onButtonImageClick={() => openModal("profilePicture")}
              onButtonProfileClick={handleButtonProfileClick}
            />
          </div>
        </div>
      )}

      {isopenModalProfilePicture && (
        <ModalProfilePicture
          preview={preview}
          selectedFile={selectedFile}
          handleFileSelect={handleFileSelect}
          handleUpdateProfilePicture={handleUpdateProfilePicture}
          closeModalProfilePicture={closeModal}
          setSelectedFile={setSelectedFile}
          setPreview={setPreview}
        />
      )}
      {isModalActive && (
        <ModalEditUser
          fields={getCurrentFields()}
          formData={formData}
          onChange={handleFieldChange}
          onSubmit={handleUpdate}
          onClose={() => {
            closeModal();
            setActiveModal("");
            setFormData({});
          }}
          isLoading={false}
        />
      )}
    </Pages>
  );
}
