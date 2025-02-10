import styles from "./order-create-page.module.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../utils/data-types";
import { orderSelector } from "../../../services/operations/selector-utils";
import Loader from "../../../components/ui/loader/loader";
import OrderDetails from "../../../components/features/Orders/order-details/order-summary";

export default function OrderCreatePage() {
  const { number } = useParams<{ number: string }>();
  const order = useAppSelector(orderSelector);

  return (
    <div className={styles.container}>
      {!order.number && <Loader />}
      {order.number > 0 && <OrderDetails />}
    </div>
  );
}
