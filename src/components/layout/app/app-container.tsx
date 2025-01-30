import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./app-container.module.css";
import Header from "../app-header/app-header";
import MainPage from "../../main/main";
import { fetchIngredients } from "../../../services/reducers/ingredients-manager-slice";
import { Location, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "../../../pages/not-found404/not-found404";
import UserProfile from "../../../pages/profile/profile";
import EditProfile from "../../../pages/profile/profile-edit/profile-edit";
import PageIngredient from "../../../pages/ingredients/ingredient-page/ingredient-page";
import IngredientModal from "../Modal/modal-ingredient/ingredient-modal";
import LoginPage from "../../../pages/auth/login-page/login-page";
import SignUpPage from "../../../pages/auth/registration-page/registration";
import ForgotPasswordPage from "../../../pages/auth/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../../pages/auth/reset-password/reset-password";
import { OnlyAuth, OnlyUnAuth } from "../../protected/protected-route";
import { fetchUserInfo } from "../../../services/reducers/authentication-slice";
import OrderHistory from "../../../pages/orders/orders-history/orders-history";
import OrderFeed from "../../../pages/feed/feed";
import { TFromLocation, useAppDispatch } from "../../../utils/data-types";
import CreateOrderPage from "../../../pages/orders/order-create-page/order-create-page";
import OrderDetailsPage from "../../../pages/orders/order-id-page/order-id-page";
import OrderDetailsModal from "../Modal/modal-order-id/order-info-modal";
import CreateOrderModal from "../Modal/modal-create-order/order-modal";

function ContainerApp() {
  const dispatch = useAppDispatch();
  const location: Location<TFromLocation> = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());

    if (localStorage.getItem("accessToken")) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <Routes location={background || location}>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path="/ingredient/:id" element={<PageIngredient />} />
          <Route path="/feed" element={<OrderFeed />} />
          <Route
            path="/order"
            element={<OnlyAuth component={<CreateOrderPage />} />}
          />
          <Route path="/feed/:id" element={<OrderDetailsPage />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<SignUpPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<UserProfile />} />}
          >
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/profile/orders" element={<OrderHistory />} />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<OnlyAuth component={<OrderDetailsPage />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredient/:id" element={<IngredientModal />} />
          <Route path="/feed/:id" element={<OrderDetailsModal />} />
          <Route path="/profile/orders/:id" element={<OrderDetailsModal />} />
          <Route
            path="/"
            element={<OnlyAuth component={<CreateOrderModal />} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default ContainerApp;
