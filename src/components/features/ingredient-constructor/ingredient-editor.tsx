import React from "react";
import clsx from "clsx";
import styles from "./ingredient-editor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { burgerConstructorSelector } from "../../../services/operations/selector-utils";
import { moveFillingElement } from "../../../services/reducers/constructor-slice";
import {
  TIngredient,
  TIngredientConstructor,
  useAppDispatch,
  useAppSelector,
} from "../../../utils/data-types";

type TCollectedProps = { isDrag: boolean };
type TIngredientEditorProps = {
  ingredient: TIngredient;
  handleRemove: () => void;
  index: number;
};

export default function IngredientEditor({
  ingredient,
  handleRemove,
  index,
}: TIngredientEditorProps) {
  const burgerConstructor: TIngredientConstructor = useAppSelector(
    burgerConstructorSelector
  );
  const dispatch = useAppDispatch();

  const [{ isDrag }, dragRef] = useDrag<TIngredient, unknown, TCollectedProps>({
    type: "sort",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TIngredient, unknown, unknown>({
    accept: "sort",
    hover(dragIngredient) {
      if (dragIngredient.uuid === ingredient.uuid) return;

      dispatch(
        moveFillingElement({
          indexFrom: burgerConstructor.filling.indexOf(dragIngredient),
          indexTo: index,
          ingredient: dragIngredient,
        })
      );
    },
  });

  return (
    <div
      className={clsx(styles.editorContainer, isDrag ? styles.draggingStyle : "")}
      ref={(element) => dragRef(dropRef(element))}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleRemove}
      />
    </div>
  );
}
