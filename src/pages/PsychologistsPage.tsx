import React from "react";
import Container from "../components/layouts/Container";
import PsychologistsList from "../components/psychologists/PsychologistsList";

export default function PsychologistsPage() {
  return (
    <section className="pt-16 pb-[100px]">
      <Container>
        <PsychologistsList />
      </Container>
    </section>
  );
}
