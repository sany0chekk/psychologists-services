import React, { useState } from "react";
import Container from "../components/layouts/Container";
import PsychologistsList from "../components/psychologists/PsychologistsList";
import PsychologistsModal from "../components/psychologists/PsychologistsModal";
import { Psychologist } from "../types/psychologist";
import { useSelector } from "react-redux";
import { selectPsychologists } from "../redux/psychologists/selectors";

export default function PsychologistsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);

  const psychologists = useSelector(selectPsychologists);

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
          <PsychologistsList
            items={psychologists}
            onOpenModal={handleOpenModal}
          />
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
