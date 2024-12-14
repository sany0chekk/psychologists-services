import React, { useState } from "react";
import Container from "../components/layouts/Container";
import { Psychologist } from "../types/psychologist";
import { selectFavorites } from "../redux/psychologists/selectors";
import { useSelector } from "react-redux";
import PsychologistsList from "../components/psychologists/PsychologistsList";
import PsychologistsModal from "../components/psychologists/PsychologistsModal";

export default function FavoritesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);

  const favorites = useSelector(selectFavorites);

  const handleOpenModal = (psychologist: Psychologist) => {
    setIsModalOpen(true);
    setPsychologist(psychologist);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <section className="pt-16 pb-[100px]">
        <Container>
          <PsychologistsList items={favorites} onOpenModal={handleOpenModal} />
        </Container>
      </section>
      <PsychologistsModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        psychologist={psychologist}
      />
    </>
  );
}
