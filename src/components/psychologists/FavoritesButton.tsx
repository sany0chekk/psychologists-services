import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectIsAuthorized, selectUser } from "../../redux/user/selectors";
import { selectFavorites } from "../../redux/psychologists/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/psychologists/operations";
import toast from "react-hot-toast";
import { Psychologist } from "../../types/psychologist";

interface Props {
  item: Psychologist;
}

export default function FavoritesButton({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthorized = useSelector(selectIsAuthorized);
  const favorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);

  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleToggleFavorites = () => {
    if (!isAuthorized) {
      toast.error("You must be authorized to add items to favorites.");
      return;
    }

    if (isFavorite) {
      dispatch(
        removeFromFavorites({ userId: user?.uid, psychologistId: item.id })
      );
    } else {
      dispatch(addToFavorites({ userId: user?.uid, psychologist: item }));
    }
  };

  return (
    <button
      onClick={handleToggleFavorites}
      className="max-md:absolute max-md:top-6 max-md:right-6"
    >
      <svg
        className={`w-6 h-6 transition-all hover:opacity-70 ${
          isFavorite ? "fill-green stroke-green" : "fill-none stroke-dark"
        }`}
      >
        <use href="./svg/icons.svg#icon-heart"></use>
      </svg>
    </button>
  );
}
