import { Location, Navigate, useLocation } from "react-router-dom";
import {
  isAuthCheckedSelector,
  userSelector,
} from "../../services/operations/selector-utils";
import { TFromLocation, useAppSelector } from "../../utils/data-types";

type TProtectedProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

function Protected({ onlyUnAuth = false, component }: TProtectedProps): JSX.Element | null {
  const isAuthChecked = useAppSelector(isAuthCheckedSelector);
  const user = useAppSelector(userSelector);
  const location: Location<TFromLocation> = useLocation();

  if (!isAuthChecked) return null;

  if (onlyUnAuth && user) {
    const redirectPath = location.state?.from || "/";
    return <Navigate to={redirectPath} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth={true} component={component} />
);
