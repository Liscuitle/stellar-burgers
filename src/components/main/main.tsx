import React from "react";
import BurgerConstructor from "../features/burger-constructor/burger-builder";
import BurgerIngredients from "../burger-ingredients/burger-ingredients-section";
import styles from "./main.module.css";
import clsx from "clsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export default function Main() {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={clsx(styles.ingredients, "mr-15")}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <BurgerIngredients />
      </section>
      <BurgerConstructor />
    </DndProvider>
  );
}
