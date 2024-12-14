import React from "react";
import PsychologistsItem from "./PsychologistsItem";
import { Psychologist } from "../../types/psychologist";

interface Props {
  items: Psychologist[];
  onOpenModal: (psychologist: Psychologist) => void;
}

export default function PsychologistsList({ items, onOpenModal }: Props) {
  return (
    <>
      {items.length > 0 ? (
        <div>
          <ul className="grid gap-8">
            {items.map((item) => (
              <PsychologistsItem
                key={item.id}
                item={item}
                onOpenModal={onOpenModal}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl opacity-40">
          List is empty
        </p>
      )}
    </>
  );
}
