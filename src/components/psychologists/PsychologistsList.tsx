import React from "react";
import items from "../../api/teachers.json";
import PsychologistsItem from "./PsychologistsItem";

export default function PsychologistsList() {
  return (
    <>
      {items.length > 0 && (
        <ul className="grid gap-8">
          {items.map((item, index) => (
            <PsychologistsItem key={index} item={item} />
          ))}
        </ul>
      )}
    </>
  );
}
