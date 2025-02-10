import React, { useEffect } from "react";
import { Location, Route, Routes, useLocation } from "react-router-dom";
import styles from "./app.module.css";

import { fetchIngredients } from "../../services/reducers/ingredients-manager-slice";
import { fetchUserInfo } from "../../services/reducers/authentication-slice";
import { TFromLocation, useAppDispatch } from "../../utils/data-types";

import AppHeader from "../layout/app-header/app-header";
import Main from "../main/main";

import Feed from "../../pages/feed/feed";
import NotFound404 from "../../pages/not-found404/not-found404";
import Profile from "../../pages/profile/profile";
import ProfileEdit from "../../pages/profile/profile-edit/profile-edit";
import OrdersHistory from "../../pages/orders/orders-history/orders-history";

import Login from "../../pages/auth/login-page/login-page";
import Registration from "../../pages/auth/registration-page/registration";
import ForgotPassword from "../../pages/auth/forgot-password-page/forgot-password-page";
import ResetPassword from "../../pages/auth/reset-password/reset-password";

import IngredientPage from "../../pages/ingredients/ingredient-page/ingredient-page";
import OrderCreatePage from "../../pages/orders/order-create-page/order-create-page";
import OrderIdPage from "../../pages/orders/order-id-page/order-id-page";

import ModalIngredient from "../layout/Modal/modal-ingredient/ingredient-modal";
import ModalOrderId from "../layout/Modal/modal-order-id/order-info-modal";
import ModalCreateOrder from "../layout/Modal/modal-create-order/order-modal";

import { OnlyAuth, OnlyUnAuth } from "../protected/protected-route";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location: Location<TFromLocation> = useLocation();
  const background = location?.state?.background || null;

  useEffect(() => {
    try {
      dispatch(fetchIngredients());

      const token = localStorage.getItem("accessToken");
      if (token) {
        dispatch(fetchUserInfo());
      } else {
        console.warn("Пользователь не авторизован");
      }
    } catch (error) {
      console.error("Ошибка при инициализации приложения:", error);
    }
  }, [dispatch]);

  const renderRoutes = () => (
    <Routes location={background || location}>
      <Route path="/" element={<AppHeader />}>
        <Route index element={<Main />} />
        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/order"
          element={<OnlyAuth component={<OrderCreatePage />} />}
        />
        <Route path="/feed/:id" element={<OrderIdPage />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Registration />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/profile/orders" element={<OrdersHistory />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<OrderIdPage />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );

  const renderModalRoutes = () =>
    background && (
      <Routes>
        <Route path="/ingredient/:id" element={<ModalIngredient />} />
        <Route path="/feed/:id" element={<ModalOrderId />} />
        <Route path="/profile/orders/:id" element={<ModalOrderId />} />
        <Route
          path="/"
          element={<OnlyAuth component={<ModalCreateOrder />} />}
        />
      </Routes>
    );

  return (
    <div className={styles.app}>
      {renderRoutes()}
      {renderModalRoutes()}
    </div>
  );
};

export default App;
