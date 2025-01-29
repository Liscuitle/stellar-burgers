import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/data-types";
import { wsEnd, wsStart } from "../../../services/operations/action-handlers";
import { wsUrl } from "../../../services/configs/app-config";
import { userOrdersSelector } from "../../../services/operations/selector-utils";
import OrderList from "../../../components/features/Orders/order-list/order-collection";

export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const userOrders = useAppSelector(userOrdersSelector);
  const orders = [...userOrders].reverse();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const token = accessToken.slice(7); 
      
      dispatch(wsStart(`${wsUrl}?token=${token}`));
    }

    return () => {
      dispatch(wsEnd());
    };
  }, []);

  return <OrderList orders={orders} />;
}
