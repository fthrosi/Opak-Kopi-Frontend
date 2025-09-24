import PromoCard from "../molecules/promoCard";
import { Pages } from "../atoms/page";
import { getAllPromos } from "@/api/promo";
import { useEffect, useState } from "react";
import type { promoType } from "@/types/promoType";
import { useUIStore } from "../store/useUIStore";
import { Text } from "../atoms/text";
import Modal from "./modal";
export default function PromoSection() {
  const [promos, setPromos] = useState<promoType[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<promoType | null>(null);
  const handleCardClick = (promo: promoType) => {
    setSelectedPromo(promo);
    setActiveModal("detailPromo");
  };
  const fetchData = async () => {
    const data = await getAllPromos();
    setPromos(data.data);
  };
  const setActiveModal = useUIStore((state) => state.open);
  const activeModal = useUIStore(
    (state) => state.activeModal === "detailPromo"
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Pages className="flex-1 flex flex-col">
      {promos.length === 0 ? (
        <div className="flex flex-1 justify-center items-center min-h-[inherit] w-full">
          <Text size="heading1" className="text-pretty">
            Promo tidak tersedia
          </Text>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promos.map((promo) => (
            <PromoCard
              key={promo.id}
              cardSize="default"
              promo={promo}
              oncardclick={() => handleCardClick(promo)}
              isDetail={selectedPromo?.id === promo.id}
            />
          ))}
        </div>
      )}
      {activeModal && selectedPromo && (
        <Modal isModalActive={activeModal} paddingWrapper="default" size="full" position="center" modalClassName="max-w-[33rem]">
          {selectedPromo && (
            <PromoCard
              promo={selectedPromo}
              isDetail
              oncardclick={() => {}}
              isModal={true}
              cardSize="modal"
            />
          )}
        </Modal>
      )}
    </Pages>
  );
}
