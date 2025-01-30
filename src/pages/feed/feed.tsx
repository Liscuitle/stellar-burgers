import React, { useEffect } from "react";
import styles from "./feed.module.css";
import clsx from "clsx";
import OrderList from "../../components/features/Orders/order-list/order-collection";
import Dashboard from "../../components/dashboard/dashboard-view";
import { useAppDispatch, useAppSelector } from "../../utils/data-types";
import { wsEnd, wsStart } from "../../services/operations/action-handlers";
import { wsUrl } from "../../services/configs/app-config";
import { ordersSelector } from "../../services/operations/selector-utils";

export default function Feed() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(wsStart(`${wsUrl}/all`));

    return () => {
      dispatch(wsEnd());
    };
  }, [dispatch]);

  return (
    <>
      <section className={clsx(styles.orders, "mr-10")}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <OrderList orders={orders} />
      </section>
      <Dashboard />
    </>
  );
}
