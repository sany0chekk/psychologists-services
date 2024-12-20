import React, { useState } from "react";
import { Psychologist } from "../../types/psychologist";
import Button from "../ui/Button";
import FavoritesButton from "./FavoritesButton";

interface Props {
  item: Psychologist;
  onOpenModal: (psychologist: Psychologist) => void;
}

export default function PsychologistsItem({ item, onOpenModal }: Props) {
  const [isFullVisible, setIsFullVisible] = useState(false);

  const {
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    conditions,
    experience,
  } = item;

  const handleOpenModal = (psychologist: Psychologist) => {
    onOpenModal(psychologist);
  };

  const handleToggleCard = () => setIsFullVisible(!isFullVisible);

  return (
    <div className="relative p-6 flex flex-col md:flex-row gap-6 bg-light rounded-3xl">
      <div className="w-[120px] h-[120px] p-3 rounded-3xl border-2 border-green border-opacity-50 flex-shrink-0">
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className="rounded-2xl"
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div>
            <p className="font-medium text-base text-grey leading-none mb-2">
              Psychologist
            </p>
            <h3 className="font-medium text-2xl text-dark leading-none">
              Dr. {name} {surname}
            </h3>
          </div>
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 font-medium text-base text-dark">
                <svg className="w-4 h-4 fill-yellow">
                  <use href="./svg/icons.svg#icon-star"></use>
                </svg>
                Rating: {rating}
              </p>
              <span className="w-[2px] h-4 bg-gray-200" />
              <p className="font-medium text-base text-dark">
                Price / 1 hour: <span>{price_per_hour}</span>
              </p>
            </div>
            <FavoritesButton item={item} />
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-1 gap-y-2 mb-6">
          <li className="bg-bg py-2 px-4 rounded-full">
            <p className="font-medium text-base text-grey">
              Lessons Done: <span className="text-dark">{lessons_done}</span>
            </p>
          </li>
          {languages.length > 0 && (
            <>
              <li className="bg-bg py-2 px-4 rounded-full">
                <p className="font-medium text-base text-grey">
                  Languages:{" "}
                  <span className="text-dark">{languages.join(", ")}</span>
                </p>
              </li>
              <li className="bg-bg py-2 px-4 rounded-full">
                <p className="font-medium text-base text-grey">
                  Language level:{" "}
                  <span className="text-dark">{levels[levels.length - 1]}</span>
                </p>
              </li>
            </>
          )}
          {conditions.length > 0 &&
            conditions.map((condition) => {
              return (
                <li key={condition} className="bg-bg py-2 px-4 rounded-full">
                  <p className="text-dark">{condition}</p>
                </li>
              );
            })}
        </ul>
        <p className="font-normal text-base text-dark opacity-50">
          {experience}
        </p>
        <div
          className={`transition-all ${
            isFullVisible
              ? "max-h-max pt-12 overflow-auto"
              : "max-h-0 pt-0 overflow-hidden"
          }`}
        >
          {reviews.length > 0 && (
            <ul className="grid gap-6 mb-10">
              {reviews.map(({ reviewer_name, reviewer_rating, comment }) => {
                return (
                  <li key={reviewer_name}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-11 h-11 rounded-full bg-lightGreen flex items-center justify-center font-medium text-xl text-green">
                        {reviewer_name[0]}
                      </span>
                      <div>
                        <p className="font-medium text-base text-dark">
                          {reviewer_name}
                        </p>
                        <p className="flex items-center font-medium text-sm gap-1">
                          <svg className="w-4 h-4 fill-yellow">
                            <use href="./svg/icons.svg#icon-star"></use>
                          </svg>
                          {reviewer_rating}
                        </p>
                      </div>
                    </div>
                    <p className="font-normal text-base text-dark opacity-50">
                      {comment}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          <Button
            variant="filled"
            className="py-3.5 px-8"
            onClick={() => handleOpenModal(item)}
          >
            Make an appointment
          </Button>
        </div>
        <button
          onClick={handleToggleCard}
          className="mt-3.5 font-medium text-base text-dark underline transition-opacity hover:opacity-70"
        >
          {isFullVisible ? "Hide more" : "Read More"}
        </button>
      </div>
    </div>
  );
}
