import React, {useState} from "react";
import {setFilter} from "../../redux/psychologists/slice.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchPsychologists} from "../../redux/psychologists/operations.ts";
import {selectCurrentFilter} from "../../redux/psychologists/selectors.ts";

type SortOption = "A to Z" | "Z to A" | "Less than 10$" | "Greater than 10$" | "Popular" | "Not popular" | "Show all";

export default function Filters() {
  const [isOpen, setIsOpen] = useState(false);

  const options: SortOption[] = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const dispatch = useDispatch<AppDispatch>();

  const currentFilter = useSelector(selectCurrentFilter)

  const handleSelectChange = (value: SortOption) => {
    setIsOpen(false);
    setFilter(value);
    dispatch(fetchPsychologists({page: 1, pageSize: 3, filter: value}))

  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-2 max-w-[226px] mb-8">
      <p className="font-medium text-sm text-grey">Filters</p>
      <div className="relative w-full">
        <div className="relative" onClick={handleToggleOpen}>
          <button className="flex items-center justify-between w-full py-3.5 px-4 border bg-green rounded-2xl text-light text-left focus:outline-none">
            {currentFilter ? currentFilter : "Select filter"}
            <svg
              className={`fill-none stroke-light w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <use href="./svg/icons.svg#icon-arrow-down"></use>
            </svg>
          </button>
          {isOpen && (
              <div className="absolute w-full mt-2 bg-light rounded-2xl shadow-lg z-10 overflow-hidden">
                <ul>
                  {options.map((option: SortOption, index) => (
                      <li
                          key={index}
                          onClick={() => handleSelectChange(option)}
                          className="px-3.5 py-4 hover:bg-gray-100 cursor-pointer"
                      >
                        <p
                            className={
                              currentFilter === option ? "text-dark" : "text-grey"
                            }
                        >
                          {option}
                        </p>
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
