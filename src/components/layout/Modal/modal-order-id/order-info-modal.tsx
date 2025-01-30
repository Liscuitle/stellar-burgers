// const location: Location<TFromLocation> = useLocation();
import {
  TFromLocation,
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/data-types";
import { orderInfoSelector } from "../../../../services/operations/selector-utils";
import {
  Location,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchOrderInfo } from "../../../../services/reducers/order-info-handler-slice";
import Modal from "../modal/base-modal";
import OrderInfo from "../../../features/Orders/order-info/order-info";

export default function ModalOrderId() {
  const location: Location<TFromLocation> = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderInfoSelector);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderInfo(id));
    }
  }, [dispatch, id]);

  if (!order) return null;

  const closeModalPath =
    location.pathname === `/profile/orders/${order.number}`
      ? "/profile/orders"
      : "/feed";

  const handleClose = () => navigate(closeModalPath);

  return (
    <Modal
      onClose={handleClose}
      titleClassName="text_type_digits-default"
      title={`#${order.number}`}
    >
      <OrderInfo order={order} />
    </Modal>
  );
}
