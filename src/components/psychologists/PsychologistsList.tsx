import React, { useEffect, useRef } from "react";
import PsychologistsItem from "./PsychologistsItem";
import { Psychologist } from "../../types/psychologist";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  selectLastKey,
  selectLoading,
} from "../../redux/psychologists/selectors";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import Loader from "../loaders/Loader";

interface Props {
  isLoadMore: boolean;
  items: Psychologist[];
  onOpenModal: (psychologist: Psychologist) => void;
}

export default function PsychologistsList({
  items,
  onOpenModal,
  isLoadMore = false,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const lastKey = useSelector(selectLastKey);
  const isLoading = useSelector(selectLoading);

  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRender = useRef(true);

  const handleLoadMore = () => {
    if (lastKey) {
      dispatch(fetchPsychologists(lastKey));
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (items.length > 0) {
      const firstNewItem = itemsRef.current[items.length - 3];

      if (firstNewItem) {
        const rect = firstNewItem.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          return;
        }

        window.scrollTo({
          top: rect.top + window.scrollY - 20,
          behavior: "smooth",
        });
      }
    }
  }, [items]);

  return (
    <div className="flex flex-col">
      {items.length > 0 ? (
        <div>
          <ul className="grid gap-8">
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                id={`psychologist-${item.id}`}
              >
                <PsychologistsItem item={item} onOpenModal={onOpenModal} />
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl opacity-40">
          List is empty
        </p>
      )}
      {isLoadMore && items.length > 0 && (
        <div className="mt-10 mx-auto">
          {isLoading ? (
            <Loader />
          ) : (
            lastKey && (
              <Button
                variant="filled"
                onClick={handleLoadMore}
                className="py-4 px-10"
              >
                Load more
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
