import React from "react";
import styles from "./ingredient-page.module.css";
import IngredientInfo from "../../../components/ingredient-info/ingredient-info";
import { ingredientsListSelector } from "../../../services/operations/selector-utils";
import { useParams } from "react-router-dom";
import { TIngredient, useAppSelector } from "../../../utils/data-types";

export default function IngredientPage() {
  const ingredients: TIngredient[] = useAppSelector(ingredientsListSelector);
  const { id } = useParams<{ id: string }>();

  const ingredient = ingredients.find((item) => item._id === id);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      {ingredient && <IngredientInfo ingredient={ingredient} />}
    </div>
  );
}
