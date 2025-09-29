import Img from "../atoms/img";
import { Button } from "../atoms/button";
import { Text } from "../atoms/text";
import type { User } from "@/types/user";
import InputForm from "../molecules/inputForm";
import type { buttonProfile } from "@/types/user";
type ProfileData = {
    profileData: User | null;
    onButtonImageClick?: () => void;
    imgDetail?: {id: number;
        title: string;
    }[];
    fieldToShow?: {id: string;
        label: string;
    }[];
    buttonProfile: buttonProfile[];
    onButtonProfileClick?: (buttonTitle: string) => void;

}

export default function ProfileComponent({profileData, onButtonImageClick, imgDetail, fieldToShow, buttonProfile, onButtonProfileClick}:ProfileData) {
  return (
    <div className="flex flex-col items-center mt-5 gap-5 ">
      <Img
        src={
          (profileData?.img.split("/").pop() !== "null"
            ? profileData?.img
            : "/image/defaultUser.jpg") || "/image/defaultUser.jpg"
        }
        alt="Profile Picture"
        className="size-30 2xl:size-40 rounded-full"
      />
      <Button
        size="custom"
        className="text-xs px-2 py-2 hover:cursor-pointer"
        onClick={onButtonImageClick}
      >
        Pilih Gambar
      </Button>
      <div className="flex flex-col gap-1">
        {imgDetail?.map((item) => (
          <Text
            key={item.id}
            size="caption"
            color="secondary"
            className="text-center"
          >
            {item.title}
          </Text>
        ))}
      </div>
      {fieldToShow?.map((field) => {
        let value = profileData?.[field.id as keyof typeof profileData];
        if (typeof value === "number" && !value) {
          value = 0;
        } else if (value === null || value === undefined) {
          value = "-";
        }
        return (
          <div className="w-full sm:max-w-[25rem]">
            <InputForm
              key={field.id}
              children={field.label}
              labelClassName="capitalize"
              inputFocus="none"
              inputProps={{
                value,
                readOnly: true,
                disabled: field.id === "poin",
              }}
            />
          </div>
        );
      })}
      <div className="flex flex-col gap-2 w-full items-center">
        {buttonProfile.map((button) => (
          <Button
            key={button.id}
            size="custom"
            className={`text-xs px-2 py-2 w-full sm:max-w-[25rem] hover:cursor-pointer ${button.background}`}
            onClick={() => onButtonProfileClick?.(button.title)}
          >
            {button.field}
          </Button>
        ))}
      </div>
    </div>
  );
}
