import React from "react";
import items from "../../api/teachers.json";
import PsychologistsItem from "./PsychologistsItem";
import { Psychologist } from "../../types/psychologist";

interface Props {
  onOpenModal: (psychologist: Psychologist) => void;
}

export default function PsychologistsList({ onOpenModal }: Props) {
  return (
    <>
      {items.length > 0 && (
        <ul className="grid gap-8">
          {items.map((item, index) => (
            <PsychologistsItem
              key={index}
              item={item}
              onOpenModal={onOpenModal}
            />
          ))}
        </ul>
      )}
    </>
  );
}
