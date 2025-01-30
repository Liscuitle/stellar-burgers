import React, { useRef, useState, RefObject } from "react";
import clsx from "clsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { ingredientsListSelector } from "../../services/operations/selector-utils";
import { useAppSelector } from "../../utils/data-types";
import styles from "./burger-ingredients.module.css";

export default function IngredientsDisplay() {
  const ingredientsData = useAppSelector(ingredientsListSelector);
  const [activeTab, setActiveTab] = useState<string>("bun");

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);

  const updateActiveTab = (): void => {
    if (
      !tabsContainerRef.current ||
      !bunsRef.current ||
      !saucesRef.current ||
      !mainsRef.current
    ) {
      return;
    }
    const bunsPosition = Math.abs(
      tabsContainerRef.current.getBoundingClientRect().top -
        bunsRef.current.getBoundingClientRect().top
    );

    const saucesPosition = Math.abs(
      tabsContainerRef.current.getBoundingClientRect().top -
        saucesRef.current.getBoundingClientRect().top
    );

    const mainsPosition = Math.abs(
      tabsContainerRef.current.getBoundingClientRect().top -
        mainsRef.current.getBoundingClientRect().top
    );

    const closestPosition = Math.min(bunsPosition, saucesPosition, mainsPosition);

    setActiveTab(
      bunsPosition === closestPosition
        ? "bun"
        : saucesPosition === closestPosition
        ? "sauce"
        : "main"
    );
  };

  const scrollToSection = (
    ref: RefObject<HTMLHeadingElement>,
    tab: string
  ): void => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab(tab);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} ref={tabsContainerRef}>
        <Tab
          value="bun"
          active={activeTab === "bun"}
          onClick={() => scrollToSection(bunsRef, "bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={activeTab === "sauce"}
          onClick={() => scrollToSection(saucesRef, "sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={activeTab === "main"}
          onClick={() => scrollToSection(mainsRef, "main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={clsx(styles.sections, "mt-10")} onScroll={updateActiveTab}>
        <h2 className={clsx("text text_type_main-medium")} ref={bunsRef}>
          Булки
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {ingredientsData.map((ingredient) => {
            if (ingredient.type === "bun") {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              );
            }
          })}
        </div>
        <h2 className={clsx("text text_type_main-medium mt-10")} ref={saucesRef}>
          Соусы
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {ingredientsData.map((ingredient) => {
            if (ingredient.type === "sauce") {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              );
            }
          })}
        </div>
        <h2 className={clsx("text text_type_main-medium mt-10")} ref={mainsRef}>
          Начинки
        </h2>
        <div className={clsx(styles.items, "mt-6 ml-4")}>
          {ingredientsData.map((ingredient) => {
            if (ingredient.type === "main") {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
