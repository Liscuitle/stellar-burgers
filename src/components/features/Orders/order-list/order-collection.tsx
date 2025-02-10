import React from "react";
import clsx from "clsx";
import styles from "./order-collection.module.css";
import OrderCard from "../order-card/order-item";
import { TFullOrder } from "../../../../utils/data-types";

type TOrdersProps = {
  orders: TFullOrder[];
};

export default function OrdersCollection({ orders }: TOrdersProps) {
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.list, "pr-2")}>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
