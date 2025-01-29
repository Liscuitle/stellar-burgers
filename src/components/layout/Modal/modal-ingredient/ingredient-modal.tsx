import React from "react";
import { ingredientsListSelector } from "../../../../services/operations/selector-utils";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInfo from "../../../ingredient-info/ingredient-info";
import Modal from "../modal/base-modal";
import { TIngredient, useAppSelector } from "../../../../utils/data-types";

export default function ModalIngredient() {
  const ingredients = useAppSelector(ingredientsListSelector);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return null;

  return (
    <Modal title="Детали ингредиента" onClose={handleClose}>
      <IngredientInfo ingredient={ingredient} />
    </Modal>
  );
}
