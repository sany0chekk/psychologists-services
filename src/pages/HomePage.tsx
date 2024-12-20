import React from "react";
import Container from "../components/layouts/Container";
import Button from "../components/ui/Button";

export default function HomePage() {
  return (
    <section className="pt-10 pb-20 flex">
      <Container className="flex flex-col laptop:flex-row items-center justify-between w-full">
        <div className="max-w-[595px] max-laptop:mb-20">
          <h1 className="font-semibold  text-5xl laptop:text-[80px] leading-[0.95] mb-5">
            The road to the <span className="text-green">depths</span> of the
            human soul
          </h1>
          <p className="max-w-[510px] font-medium text-lg mb-10">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <Button
            variant="filled"
            type="link"
            href="psychologists"
            className="py-4 px-12"
          >
            Get started
            <svg className="w-[15px] h-[17px] fill-light">
              <use href="./svg/icons.svg#icon-arrow"></use>
            </svg>
          </Button>
        </div>
        <div className="relative max-w-[464px]">
          <img
            srcSet="./images/hero.jpg 1x, ./images/hero@2x.jpg 2x"
            src="./images/hero.jpg"
            className="rounded-md"
            alt="Hero image"
          />
          <div className="p-4 laptop:p-8 rounded-2xl bg-green inline-flex items-center gap-4 absolute max-laptop:translate-y-1/3 bottom-0 laptop:bottom-[10%] left-1/2 max-laptop:-translate-x-1/2 laptop:-left-[100px] max-laptop:w-full max-w-[250px] md:max-w-[300px]">
            <span className="w-[54px] h-[54px] bg-light rounded-2xl flex items-center justify-center">
              <svg className="w-5 h-5 fill-green">
                <use href="./svg/icons.svg#icon-check"></use>
              </svg>
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-sm opacity-50 text-light">
                Experienced psychologists
              </p>
              <p className="font-bold text-2xl text-light">15,000</p>
            </div>
          </div>
          <span className="absolute top-1/3 laptop:-left-8 -rotate-[15deg] w-10 h-10 bg-purple rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 fill-light">
              <use href="./svg/icons.svg#icon-question"></use>
            </svg>
          </span>
          <span className="absolute top-[15%] right-0 laptop:-right-9 rotate-[15deg] w-12 h-12 bg-yellow rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 fill-light">
              <use href="./svg/icons.svg#icon-users"></use>
            </svg>
          </span>
        </div>
      </Container>
    </section>
  );
}
