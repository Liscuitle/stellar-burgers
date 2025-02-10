import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/data-types";
import { orderSelector } from "../../services/operations/selector-utils";
import Modal from "../layout/Modal/modal/base-modal";
import Loader from "../ui/loader/loader";
import OrderDetails from "../features/Orders/order-details/order-summary";

export default function ModalCreateOrder() {
  const navigate = useNavigate();
  const order = useAppSelector(orderSelector);

  const handleClose = () => navigate("/");

  return (
    <Modal onClose={handleClose}>
      {!order.number ? <Loader /> : <OrderDetails />}
    </Modal>
  );
}
