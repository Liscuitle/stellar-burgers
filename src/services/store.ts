import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-manager-slice";
import burgerConstructorReducer from "./reducers/constructor-slice";
import orderReducer from "./reducers/order-manager-slice";
import orderInfoReducer from "./reducers/order-info-handler-slice";
import authReducer from "./reducers/authentication-slice";
import wsReducer, {
  wsClose,
  wsError,
  wsOpen,
  wsRequest,
} from "./reducers/websocket-handler-slice";
import wsUserReducer, {
  wsUserClose,
  wsUserError,
  wsUserOpen,
  wsUserRequest,
} from "./reducers/ws-user-slice";
import { wsMiddleware } from "./middlewares/socket-handler";
import { wsEnd, wsStart } from "./operations/action-handlers";
const wsUserOrdersAction = {
  wsClose: wsUserClose,
  wsError: wsUserError,
  wsRequest: wsUserRequest,
  wsStart: wsStart,
  wsEnd: wsEnd,
  wsOpen: wsUserOpen,
};

const wsOrdersAction = {
  wsClose: wsClose,
  wsError: wsError,
  wsRequest: wsRequest,
  wsStart: wsStart,
  wsEnd: wsEnd,
  wsOpen: wsOpen,
};

const userOrdersMiddleware = wsMiddleware(wsUserOrdersAction);

const ordersMiddleware = wsMiddleware(wsOrdersAction);

export const store = configureStore({
  reducer: {
    ingredientsList: ingredientsReducer,
    wsOrders: wsReducer,
    wsUserOrders: wsUserReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    orderInfo: orderInfoReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersMiddleware,
      userOrdersMiddleware
    );
  },
});
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
